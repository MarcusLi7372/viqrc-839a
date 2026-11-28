/* ─── Team 839A Admin CMS ─── */
(function(){
  const PASS = '839aadmin';
  const STORE_KEY = '839a_content';
  const AUTH_KEY  = '839a_admin_auth';

  /* ── helpers ── */
  function isAdmin(){ return sessionStorage.getItem(AUTH_KEY) === '1'; }

  function parseVideoUrl(url){
    // YouTube: youtube.com/watch?v=ID or youtu.be/ID
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if(m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1`;
    // YouTube share/embed already
    m = url.match(/youtube\.com\/embed\/([\w-]+)/);
    if(m) return url;
    // Google Drive: drive.google.com/file/d/ID/view
    m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if(m) return `https://drive.google.com/file/d/${m[1]}/preview`;
    // Google Drive already embed
    m = url.match(/drive\.google\.com\/.*\/d\/([\w-]+)\/preview/);
    if(m) return url;
    return null;
  }

  /* ── load saved content into DOM ── */
  function loadContent(){
    let saved;
    try{ saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); }catch(e){ saved = null; }
    if(!saved) return;

    // text nodes
    (saved.texts || []).forEach(function(t){
      const el = document.querySelector(t.sel);
      if(el) el.innerHTML = t.html;
    });

    // images
    (saved.images || []).forEach(function(img){
      const el = document.querySelector(img.sel);
      if(el && el.tagName === 'IMG') el.src = img.src;
    });

    // videos
    (saved.videos || []).forEach(function(v){
      const card = document.querySelector(v.sel);
      if(!card) return;
      applyVideoToCard(card, v.embedUrl, v.title);
    });
  }

  function applyVideoToCard(card, embedUrl, title){
    const thumb = card.querySelector('.video-thumb, .video-empty-thumb');
    if(!thumb) return;
    // replace empty thumb with real thumb
    const newThumb = document.createElement('div');
    newThumb.className = 'video-thumb';
    const iframe = document.createElement('iframe');
    iframe.src = '';
    iframe.dataset.src = embedUrl;
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    newThumb.appendChild(iframe);

    const btn = document.createElement('div');
    btn.className = 'play-btn';
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    btn.addEventListener('click', function(){ playVideo(newThumb); });
    newThumb.appendChild(btn);

    thumb.replaceWith(newThumb);

    const metaTitle = card.querySelector('.video-title');
    if(metaTitle && title) metaTitle.textContent = title;
  }

  function playVideo(thumbEl){
    const iframe = thumbEl.querySelector('iframe');
    if(!iframe) return;
    iframe.src = iframe.dataset.src || '';
    thumbEl.classList.add('playing');
  }

  /* ── wire up existing play buttons (non-admin, pre-set videos) ── */
  function wirePlayButtons(){
    document.querySelectorAll('.play-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        playVideo(btn.closest('.video-thumb'));
      });
    });
  }

  /* ── scroll reveal ── */
  function initReveal(){
    const obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    },{threshold:0.08});
    document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
  }

  /* ── stat counters ── */
  function initCounters(){
    document.querySelectorAll('[data-count]').forEach(function(el){
      const target = parseFloat(el.dataset.count);
      if(isNaN(target)) return;
      const suffix = el.dataset.suffix || '';
      let start = null;
      const dur = 1200;
      const obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(!e.isIntersecting) return;
          obs.unobserve(el);
          function step(ts){
            if(!start) start = ts;
            const prog = Math.min((ts-start)/dur,1);
            const ease = 1-Math.pow(1-prog,3);
            const val = Math.round(target*ease);
            el.textContent = val + suffix;
            if(prog < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },{threshold:0.5});
      obs.observe(el);
    });
  }

  /* ── schedule countdown ── */
  function initCountdown(){
    document.querySelectorAll('[data-event-date]').forEach(function(el){
      const d = new Date(el.dataset.eventDate);
      if(isNaN(d)) return;
      const now = new Date();
      const diff = Math.ceil((d - now)/(1000*60*60*24));
      if(diff < 0) return;
      const badge = document.createElement('span');
      badge.className = 'countdown-badge';
      badge.textContent = diff === 0 ? 'TODAY' : diff + 'd away';
      el.appendChild(badge);
    });
  }

  /* ── ADMIN: inject modal markup ── */
  function injectAdminUI(){
    document.body.insertAdjacentHTML('beforeend', `
      <div class="admin-modal-overlay" id="adminModal">
        <div class="admin-modal">
          <div class="admin-modal-title">Admin Access</div>
          <div class="admin-modal-sub">Enter the team password to enable editing.</div>
          <input class="admin-modal-input" id="adminPassInput" type="password" placeholder="Password" autocomplete="off"/>
          <div class="admin-modal-err" id="adminErr">Incorrect password.</div>
          <div class="admin-modal-actions">
            <button class="btn-fill" id="adminLoginBtn" style="font-size:0.72rem;padding:0.65rem 1.5rem">Unlock</button>
            <button class="btn-ghost" id="adminCancelBtn" style="font-size:0.72rem;padding:0.65rem 1.5rem;border-left:2px solid rgba(255,255,255,0.18)">Cancel</button>
          </div>
        </div>
      </div>
      <div class="admin-bar" id="adminBar">
        <span class="admin-bar-label">⚙ Admin Mode — editing enabled</span>
        <div class="admin-bar-actions">
          <button class="admin-bar-btn" id="adminSaveBtn">Save Changes</button>
          <button class="admin-bar-btn danger" id="adminLogoutBtn">Exit</button>
        </div>
      </div>
    `);
  }

  /* ── ADMIN: enable edit mode ── */
  function enableEditMode(){
    document.body.classList.add('admin-active');
    document.getElementById('adminBar').classList.add('active');

    // make text blocks editable
    const editSelectors = [
      '.hero-headline','.hero-body','.hero-series',
      '.banner-title','.banner-sub','.banner-tag',
      '.robot-desc','.robot-name','.robot-stag',
      '.spec-v','.spec-k',
      '.goal-title','.goal-desc',
      '.hof-name','.hof-desc','.hof-season',
      '.post-title','.post-exc','.post-cat','.post-date',
      '.sched-event','.sched-date',
      '.body-p','.h2','.about-tag',
      '.video-title','.video-sub',
      '.sponsor-h','.sponsor-p',
    ];
    editSelectors.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        el.contentEditable = 'true';
      });
    });

    // image upload overlays
    document.querySelectorAll('img').forEach(function(img){
      if(img.closest('.admin-img-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'admin-img-wrap';
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      const btn = document.createElement('div');
      btn.className = 'admin-img-upload';
      btn.textContent = '📷 Upload Photo';
      btn.addEventListener('click', function(){
        const inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = 'image/*';
        inp.onchange = function(){
          const file = inp.files[0];
          if(!file) return;
          const reader = new FileReader();
          reader.onload = function(e){ img.src = e.target.result; };
          reader.readAsDataURL(file);
        };
        inp.click();
      });
      wrap.appendChild(btn);
    });

    // video add inputs
    document.querySelectorAll('.video-card').forEach(function(card, idx){
      let addDiv = card.querySelector('.admin-video-add');
      if(!addDiv){
        addDiv = document.createElement('div');
        addDiv.className = 'admin-video-add';
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.placeholder = 'Paste YouTube or Google Drive URL…';
        const applyBtn = document.createElement('button');
        applyBtn.textContent = 'Add';
        applyBtn.addEventListener('click', function(){
          const embed = parseVideoUrl(inp.value.trim());
          if(!embed){ alert('Could not parse URL. Paste a YouTube or Google Drive share link.'); return; }
          const titleInput = card.querySelector('.video-title');
          applyVideoToCard(card, embed, titleInput ? titleInput.textContent : '');
          inp.value = '';
        });
        addDiv.appendChild(inp);
        addDiv.appendChild(applyBtn);
        card.appendChild(addDiv);
      }
    });
  }

  /* ── ADMIN: save ── */
  function saveContent(){
    const data = { texts:[], images:[], videos:[] };

    const textSelectors = [
      '.hero-headline','.hero-body','.hero-series',
      '.banner-title','.banner-sub','.banner-tag',
      '.robot-desc','.robot-name','.robot-stag',
      '.spec-v','.spec-k',
      '.goal-title','.goal-desc',
      '.hof-name','.hof-desc','.hof-season',
      '.post-title','.post-exc','.post-cat','.post-date',
      '.sched-event','.sched-date',
      '.body-p','.h2','.about-tag',
      '.video-title','.video-sub',
      '.sponsor-h','.sponsor-p',
    ];
    textSelectors.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el, i){
        const uniqueSel = sel + ':nth-of-type(' + (i+1) + ')';
        data.texts.push({ sel: uniqueSel, html: el.innerHTML });
      });
    });

    document.querySelectorAll('img').forEach(function(img, i){
      if(img.src && img.src.startsWith('data:')){
        data.images.push({ sel: 'img:nth-of-type('+(i+1)+')', src: img.src });
      }
    });

    document.querySelectorAll('.video-card').forEach(function(card, i){
      const iframe = card.querySelector('iframe');
      if(iframe && iframe.dataset.src){
        const title = card.querySelector('.video-title');
        data.videos.push({
          sel: '.video-card:nth-of-type('+(i+1)+')',
          embedUrl: iframe.dataset.src,
          title: title ? title.textContent : ''
        });
      }
    });

    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    const btn = document.getElementById('adminSaveBtn');
    const orig = btn.textContent;
    btn.textContent = '✓ Saved!';
    setTimeout(function(){ btn.textContent = orig; }, 2000);
  }

  /* ── ADMIN: logout ── */
  function disableEditMode(){
    sessionStorage.removeItem(AUTH_KEY);
    document.body.classList.remove('admin-active');
    document.getElementById('adminBar').classList.remove('active');
    document.querySelectorAll('[contenteditable]').forEach(function(el){
      el.removeAttribute('contenteditable');
    });
    document.querySelectorAll('.admin-video-add').forEach(function(el){ el.style.display='none'; });
  }

  /* ── wire admin controls ── */
  function wireAdminControls(){
    const trigger = document.querySelector('.admin-trigger');
    const modal   = document.getElementById('adminModal');
    const inp     = document.getElementById('adminPassInput');
    const err     = document.getElementById('adminErr');

    if(trigger) trigger.addEventListener('click', function(){ modal.classList.add('open'); inp.value=''; err.style.display='none'; setTimeout(function(){inp.focus();},60); });
    document.getElementById('adminCancelBtn').addEventListener('click', function(){ modal.classList.remove('open'); });
    document.getElementById('adminLoginBtn').addEventListener('click', function(){
      if(inp.value === PASS){
        modal.classList.remove('open');
        sessionStorage.setItem(AUTH_KEY,'1');
        enableEditMode();
      } else {
        err.style.display='block';
        inp.value='';
        inp.focus();
      }
    });
    inp.addEventListener('keydown', function(e){ if(e.key==='Enter') document.getElementById('adminLoginBtn').click(); });
    document.getElementById('adminSaveBtn').addEventListener('click', saveContent);
    document.getElementById('adminLogoutBtn').addEventListener('click', disableEditMode);
    modal.addEventListener('click', function(e){ if(e.target===modal) modal.classList.remove('open'); });
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', function(){
    loadContent();
    initReveal();
    initCounters();
    initCountdown();
    wirePlayButtons();
    injectAdminUI();
    wireAdminControls();
    if(isAdmin()) enableEditMode();
  });
})();
