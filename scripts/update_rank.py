import json, urllib.request, datetime, sys
URL = "https://events.vex.com/api/seasons/203/skills?post_season=0&grade_level=Middle%20School"
req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0 (839A team site rank updater)", "Accept": "application/json"})
data = json.load(urllib.request.urlopen(req, timeout=60))
rows = data if isinstance(data, list) else data.get("data", [])
rows.sort(key=lambda r: r["rank"])
me = next(r for r in rows if r["team"]["team"] == "839A")
ca = [r for r in rows if r["team"].get("country") == "Canada"]
on = [r for r in ca if r["team"].get("region") == "Ontario"]
out = {
    "world": me["rank"], "worldTotal": len(rows),
    "canada": [r["team"]["team"] for r in ca].index("839A") + 1, "canadaTotal": len(ca),
    "ontario": [r["team"]["team"] for r in on].index("839A") + 1, "ontarioTotal": len(on),
    "score": me["scores"]["score"], "driver": me["scores"]["driver"], "programming": me["scores"]["programming"],
    "updated": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%MZ"),
}
old = {}
try: old = json.load(open("assets/data/rank.json"))
except Exception: pass
same = {k: v for k, v in old.items() if k != "updated"} == {k: v for k, v in out.items() if k != "updated"}
if same and old: print("no change"); sys.exit(0)
json.dump(out, open("assets/data/rank.json", "w"), indent=1)
hist = []
try: hist = json.load(open("assets/data/rank_history.json"))
except Exception: pass
day = out["updated"][:10]
pt = {"date": day, "world": out["world"], "canada": out["canada"], "ontario": out["ontario"], "score": out["score"]}
hist = [h for h in hist if h["date"] != day] + [pt]
json.dump(hist, open("assets/data/rank_history.json", "w"), indent=0)
print(out)
