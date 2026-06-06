# PRD: Robotics Team Website

## 1. Project Overview

### Product Name

Robotics Team Website

### Purpose

Create a professional, student-friendly website for a competitive robotics team to showcase the team’s identity, robot development, competition achievements, media, updates, and sponsorship/contact information.

The website should help the team communicate clearly with judges, sponsors, parents, students, coaches, and the robotics community.

### Target Users

* Competition judges
* Potential sponsors
* Parents and students
* Team members
* Coaches and mentors
* Other robotics teams
* Community partners

---

## 2. Goals

### Primary Goals

1. Present the team in a professional and organized way.
2. Showcase the current season robot and past robot versions.
3. Highlight competition results, awards, and team achievements.
4. Provide a place for regular updates, blog posts, and progress logs.
5. Make it easy for sponsors or community members to contact the team.
6. Support long-term maintenance by students or coaches.

### Non-Goals

* The website is not a full team management system.
* The website does not need user login in the first version.
* The website does not need real-time match scoring.
* The website does not need complex database management for MVP.

---

## 3. Recommended Tech Stack

### Frontend

* Astro or Next.js
* Tailwind CSS
* Markdown or MDX for content updates

### Hosting

* GitHub for source control
* Vercel for deployment

### Content Management

For MVP, content can be updated through Markdown files in the GitHub repository.

Future versions may add a CMS such as:

* Sanity
* Contentful
* Decap CMS
* Notion-based CMS

---

## 4. Core Pages

## 4.1 Homepage

### Purpose

Give visitors a quick overview of the team, current robot, latest achievements, and ways to explore more.

### Sections

1. Hero Section

   * Team name
   * Team slogan or short mission statement
   * Main team/robot image
   * Call-to-action buttons:

     * View Our Robot
     * See Achievements
     * Contact Us

2. Team Introduction

   * Short paragraph introducing the team
   * Location, program, and competition platform
   * Brief description of what the team does

3. Featured Robot

   * Current season robot name
   * Robot image
   * Short design summary
   * Link to full Robot page

4. Competition Highlights

   * Recent awards
   * Major achievements
   * Upcoming events

5. Media Preview

   * Selected photos or videos
   * Link to full Media page

6. Latest Updates

   * Recent blog posts or progress updates
   * Link to full Updates page

7. Sponsor / Contact CTA

   * Short message inviting sponsors or collaborators
   * Link to Contact page

---

## 4.2 About Page

### Purpose

Introduce the team, members, roles, mission, and culture.

### Required Content

* Team story
* Mission statement
* Team values
* Member list
* Member roles
* Coach/mentor information
* Team photo

### Suggested Member Roles

* Team Captain
* Build Lead
* Programming Lead
* Notebook Lead
* Drive Team
* Strategy Lead
* Media Lead
* Outreach Lead
* Mentor / Coach

### Features

* Team member cards
* Role descriptions
* Optional short bios
* Optional fun facts

---

## 4.3 Robot Page

### Purpose

Showcase the team’s current robot and previous robot versions.

### Sections

1. Current Robot

   * Robot name
   * Season
   * Photos
   * Design overview
   * Key mechanisms
   * Programming features
   * Strengths
   * Areas for improvement

2. Robot Versions / Evolution

   * Version timeline
   * Past robot names
   * Photos of each version
   * What changed between versions
   * Lessons learned

3. Retired Robots / Hall of Fame

   * Special section for memorable past robots
   * Example: retired robot names like “Marcus”
   * Short story about why the robot was important

### Robot Version Template

Each robot version should include:

* Robot name
* Version number
* Date range
* Main design goal
* Key features
* What worked well
* What needed improvement
* Photos/videos

---

## 4.4 Competition / Events Page

### Purpose

Display competition history, results, awards, and upcoming events.

### Sections

1. Upcoming Events

   * Event name
   * Date
   * Location
   * Competition type
   * Optional countdown timer

2. Past Competitions

   * Event name
   * Date
   * Ranking/results
   * Awards
   * Match highlights
   * Photos/videos

3. Awards

   * Award name
   * Event
   * Date
   * Description

### Features

* Timeline layout
* Award cards
* Optional filter by season
* Optional live countdown for next event

---

## 4.5 Media Gallery

### Purpose

Showcase team photos, robot videos, event highlights, and behind-the-scenes moments.

### Content Types

* Robot photos
* Team photos
* Competition photos
* Pit photos
* Build process photos
* Short videos
* Match highlights

### Features

* Image grid
* Video embed support
* Category filtering
* Mobile-friendly layout

---

## 4.6 Blog / Updates Page

### Purpose

Allow the team to post weekly updates, robot progress, competition reflections, and outreach stories.

### Post Types

* Weekly build updates
* Programming updates
* Competition recaps
* Design reflections
* Outreach posts
* Sponsor updates

### Blog Post Template

Each post should include:

* Title
* Date
* Author
* Category
* Main content
* Images
* Related robot version or event, if applicable

### MVP Content Workflow

* Each blog post is written in Markdown.
* Team members commit posts to GitHub.
* Vercel automatically deploys updates.

---

## 4.7 Contact / Sponsorship Page

### Purpose

Make it easy for sponsors, parents, community members, or other teams to contact the team.

### Required Content

* Contact email
* Social media links
* Short sponsor invitation
* Sponsorship benefits
* Optional contact form

### Suggested CTA

“Interested in supporting our team? Contact us to learn more about sponsorship opportunities, community partnerships, and robotics education outreach.”

### Features

* Contact form
* Email link
* Sponsor package download link, if available
* Social media links

---

## 5. Design Requirements

### Visual Style

The website should feel:

* Futuristic
* Clean
* Professional
* Student-friendly
* Competitive robotics themed
* Sponsor-ready

### Recommended Design Direction

* Dark or light premium tech theme
* Strong typography
* Clean card-based layout
* Subtle robotics/circuit-inspired visuals
* High-quality robot photos
* Clear navigation

### Audience Balance

The site should be professional enough for sponsors and judges, but still cool and engaging for Grade 5–12 students.

---

## 6. Navigation Structure

### Main Navigation

* Home
* About
* Robot
* Competitions
* Media
* Updates
* Contact

### Optional Future Navigation

* Sponsors
* Outreach
* Engineering Notebook
* Resources

---

## 7. MVP Features

### Required MVP Features

* Responsive website design
* Homepage
* About page
* Robot page with current and past robot versions
* Competition/events page
* Media gallery
* Blog/updates section
* Contact page
* GitHub-based content updates
* Vercel deployment

### Optional MVP Features

* Countdown timer for next competition
* Embedded YouTube videos
* Sponsor download button
* Basic contact form
* Robot version timeline

---

## 8. Future Features

Future versions may include:

* CMS for easier content updates
* Admin dashboard
* Search function
* Advanced robot timeline
* Interactive engineering notebook
* Sponsor portal
* Newsletter signup
* Team calendar integration
* Match video archive
* Multilingual support
* Private team resources page

---

## 9. Content Requirements

### Photos

The team should prepare:

* Team photo
* Current robot photos
* Past robot photos
* Competition photos
* Build process photos
* Awards photos

### Written Content

The team should prepare:

* Team introduction
* Mission statement
* Member names and roles
* Robot descriptions
* Competition results
* Award descriptions
* Blog/update posts
* Contact information
* Sponsor message

---

## 10. User Stories

### Visitor

As a visitor, I want to quickly understand who the team is so that I know what they do.

### Judge

As a judge, I want to see the robot design process and team achievements so that I can understand the team’s growth and effort.

### Sponsor

As a sponsor, I want to see the team’s professionalism, achievements, and contact information so that I can decide whether to support them.

### Parent

As a parent, I want to see team updates, photos, and competition progress so that I understand what students are doing.

### Team Member

As a team member, I want to post updates and show our robot progress so that our work is documented.

### Coach

As a coach, I want the site to be easy to update so that it can stay active during the season.

---

## 11. Success Metrics

The project is successful if:

* The website is live on Vercel.
* The homepage clearly introduces the team.
* The robot page shows current and past robot versions.
* Competition achievements are easy to find.
* The website works well on mobile and desktop.
* Team members or coaches can update content weekly.
* Sponsors or visitors can easily contact the team.

---

## 12. Content Update Workflow

### Weekly Update Process

1. Team member writes an update in Markdown.
2. Coach or team lead reviews the content.
3. Content is committed to GitHub.
4. Vercel automatically deploys the update.
5. Website reflects the new post.

### Recommended Update Frequency

* Blog/update posts: weekly
* Competition results: after every event
* Robot page: after major design changes
* Media gallery: after major events
* Homepage highlights: monthly or after awards

---

## 13. MVP Timeline

### Phase 1: Planning

* Confirm pages
* Confirm design direction
* Collect initial content
* Prepare photos and team information

### Phase 2: Design

* Create homepage layout
* Create page templates
* Define typography, colors, and components

### Phase 3: Development

* Build site using Astro or Next.js
* Add responsive layout
* Add content pages
* Add blog/update support
* Add media gallery

### Phase 4: Deployment

* Push to GitHub
* Deploy with Vercel
* Connect custom domain if available
* Test on mobile and desktop

### Phase 5: Maintenance

* Train team members to update Markdown files
* Create a content checklist
* Review site monthly

---

## 14. Acceptance Criteria

The MVP is complete when:

* The website has all required main pages.
* The homepage has a clear team introduction.
* The Robot page includes current robot and past versions.
* The Competition page includes past results and upcoming events.
* The Media page displays photos or videos.
* The Updates page supports Markdown-based posts.
* The Contact page includes sponsor/contact information.
* The website is deployed on Vercel.
* The website is responsive on desktop, tablet, and mobile.
* The team can update content through GitHub.

---

## 15. Open Questions

1. What is the team name and logo?
2. Does the team already have a domain?
3. Will the website use Astro or Next.js?
4. Who will be responsible for weekly updates?
5. Will the site include a contact form or only an email link?
6. Will the team need multilingual support?
7. Should sponsor information be a separate page or part of the Contact page?
8. Should robot version history include only this season or all past seasons?
9. Should the team include engineering notebook content publicly?
10. Should the site include individual student bios or only roles?

---

## 16. Recommended MVP Decision

For the first version, build a clean static website using Astro, Tailwind CSS, GitHub, and Vercel.

Use Markdown files for blog posts, robot versions, and competition updates. This gives the team a professional website while keeping maintenance simple enough for students and coaches.
