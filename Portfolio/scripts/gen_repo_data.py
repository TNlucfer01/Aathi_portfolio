#!/usr/bin/env python3
"""
Generates src/data/repos.json from local clones of your GitHub repos, so the
portfolio's file trees, commit logs and stats are REAL rather than hand-written.

usage:  python3 scripts/gen_repo_data.py <dir-containing-clones> [out.json]
Each clone dir name must match a key in REPOS below.
"""
import json, re, subprocess, sys, os
from collections import Counter

ME = "ihdaa2006"  # your commit email local-part, used to count your own commits

REPOS = {  # project id -> clone directory name
    "vir": "Vir_RAG_assistant", "donbosco": "DonboscoAWEB", "tes": "Django_mps",
    "plant": "plant-disease", "htshare": "HtShare", "attendanceweb": "AttendanceWeb",
    "fakenews": "fake_news_detection", "tictactoe": "Tic_tac_toe", "rag": "RAG",
    "agentic": "AGentic_workflow", "smartcampus": "smart-campus", "nvim": "nvim_config",
    "neetcode": "neetcode-submissions", "learning": "my-learnig-path-",
    "oslab": "OS_lab", "osl": "osl", "intern": "Intern", "reacti": "REACTI",
    "farmerguide": "FarmerGuide",
}

NOISE = re.compile(
    r"(^|/)(node_modules|dist|build|__pycache__|\.git|\.gradle|\.idea|\.vscode|\.venv|venv|"
    r"site-packages|\.ipynb_checkpoints|\.virtual_documents|SDL2-devel[^/]*|SDL2-[0-9][^/]*|SDL|media|\.agents|\.claude|"
    r"\.django_cache|\.metadata|jdt\.ls-java-project|HtShare\.AppDir)(/|$)")
SECRETISH = re.compile(r"(\.env|secret|credential|\.pem|\.key|dump|\.sql|\.sqlite3?|\.db|\.log|\.zip|\.tar\.gz|\.AppImage|\.lnk|\.dll|\.exe|\.mp3|\.bmp|\.webp|\.jpe?g|\.png|\.ico)", re.I)
LANG = {"py": "Python", "js": "JavaScript", "jsx": "JavaScript", "ts": "TypeScript", "tsx": "TypeScript",
        "java": "Java", "c": "C", "h": "C", "cpp": "C++", "kt": "Kotlin", "lua": "Lua", "sh": "Shell",
        "dart": "Dart", "ipynb": "Jupyter", "md": None}


def sh(*a, cwd=None):
    return subprocess.run(a, cwd=cwd, capture_output=True, text=True).stdout


def build_tree(paths, depth=3, per_dir=12):
    root = {}
    for p in paths:
        node = root
        parts = p.split("/")
        for i, part in enumerate(parts):
            last = i == len(parts) - 1
            if i >= depth:
                break
            node = node.setdefault(part, None if last else {}) if last else node.setdefault(part, {})
            if node is None:
                break

    def finalize(n):
        out = []
        dirs = sorted(k for k, v in n.items() if v is not None)
        files = sorted(k for k, v in n.items() if v is None)
        entries = [(k, True) for k in dirs] + [(k, False) for k in files]
        for k, is_dir in entries[:per_dir]:
            out.append({"n": k, "d": True, "c": finalize(n[k])} if is_dir else {"n": k})
        if len(entries) > per_dir:
            out.append({"n": f"… {len(entries) - per_dir} more", "more": True})
        return out
    return finalize(root)


def main():
    base = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "src/data/repos.json"
    data = {}
    for pid, name in REPOS.items():
        d = os.path.join(base, name)
        if not os.path.isdir(d):
            print("skip (missing):", name)
            continue
        files = [f for f in sh("git", "ls-tree", "-r", "--name-only", "HEAD", cwd=d).splitlines() if f]
        clean = [f for f in files if not NOISE.search(f) and not SECRETISH.search(f)
                 and not any(seg.startswith(".") and seg != ".github" for seg in f.split("/"))]
        exts = Counter()
        for f in clean:
            e = f.rsplit(".", 1)[-1].lower() if "." in f.split("/")[-1] else ""
            lang = LANG.get(e)
            if lang:
                exts[lang] += 1
        total = sum(exts.values()) or 1
        mix = [{"lang": l, "pct": round(100 * c / total)} for l, c in exts.most_common(4)]

        total_commits = int(sh("git", "rev-list", "--count", "HEAD", cwd=d).strip() or 0)
        mine = int(sh("git", "rev-list", "--count", f"--author={ME}", "HEAD", cwd=d).strip() or 0)
        contributors = len({a.split("<")[-1].strip(">") for a in sh("git", "log", "--format=%an <%ae>", cwd=d).splitlines()})
        dates = sh("git", "log", "--format=%ad", "--date=short", cwd=d).split()
        log = []
        for line in sh("git", "log", f"--author={ME}", "--format=%h\t%ad\t%s", "--date=short", "-n", "6", cwd=d).splitlines():
            h, dt, s = line.split("\t", 2)
            s = re.sub(r"\S+@\S+", "", s)[:64]
            log.append({"h": h, "d": dt, "s": s})
        data[pid] = {
            "repo": name, "commits": total_commits, "mine": mine, "contributors": contributors,
            "first": dates[-1] if dates else None, "last": dates[0] if dates else None,
            "mix": mix, "log": log, "tree": build_tree(clean),
        }
        print(f"{pid:14} commits={total_commits:4} mine={mine:3} contrib={contributors} mix={mix[:2]}")
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    json.dump(data, open(out, "w"), separators=(",", ":"))
    print("wrote", out, os.path.getsize(out) // 1024, "KB")


main()
