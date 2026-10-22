import { useCallback, useRef, useState } from "react";
import { buildFs, HOME, prettyPath } from "./fs";
import { runLine, complete as completeLine } from "./shell";
import { profile } from "../data/system";

const MAX_LINES = 600;

const banner = () => [
  { k: "out", l: [["aathi-sh", "c-mauve"], [" — a simulated Linux session. Nothing here runs on a real machine.", "c-sub"]] },
  { k: "out", l: [["try: ", "c-sub"], ["ls", "c-green"], ["  ", ""], ["cat about.txt", "c-green"], ["  ", ""], ["cd projects", "c-green"], ["  ", ""], ["tree -L 2", "c-green"], ["  ", ""], ["theme nord", "c-green"], ["  ·  Tab completes, ↑ recalls, `help` lists everything", "c-sub"]] },
];

/**
 * One shared shell session for the whole desktop, so the terminal on the home
 * workspace and the full-screen one are the same session (like tmux).
 */
export function useShell(api) {
  const S = useRef(null);
  if (!S.current)
    S.current = {
      fs: buildFs(), cwd: HOME, oldcwd: HOME, startedAt: Date.now(), history: [], lastCode: 0,
      env: { HOME, USER: profile.user, HOSTNAME: profile.host, SHELL: "aathi-sh", WM: profile.wm, EDITOR: "nvim", LANG: "en_US.UTF-8", PATH: "/usr/local/bin:/usr/bin:/bin" },
    };
  const apiRef = useRef(api);
  apiRef.current = api;

  // open with `ls` already run, so the first thing a visitor sees is something to explore
  const [lines, setLines] = useState(() => {
    const r = runLine(S.current, "ls", {});
    return [
      ...banner(),
      { k: "in", cwd: HOME, text: "ls" },
      ...r.out.map((l) => ({ k: "out", l: typeof l === "string" ? [[l, ""]] : l })),
    ];
  });
  const [cwd, setCwd] = useState(HOME);

  const push = useCallback((items) => setLines((p) => [...p, ...items].slice(-MAX_LINES)), []);

  const run = useCallback((raw) => {
    const s = S.current;
    const echo = { k: "in", cwd: s.cwd, text: raw };
    const line = raw.trim();
    if (!line) return push([echo]);
    if (s.history[s.history.length - 1] !== line) s.history.push(line);
    const { out, actions } = runLine(s, line, apiRef.current);
    setCwd(s.cwd);
    let cleared = false;
    for (const a of actions) {
      if (a.type === "clear") cleared = true;
      else if (a.type === "reset") { s.fs = buildFs(); s.cwd = HOME; s.oldcwd = HOME; setCwd(HOME); }
      else apiRef.current.onAction?.(a);
    }
    if (cleared) return setLines([]);
    push([echo, ...out.map((l) => ({ k: "out", l: typeof l === "string" ? [[l, ""]] : l }))]);
  }, [push]);

  const complete = useCallback((input) => {
    const r = completeLine(S.current, input);
    return r;
  }, []);

  const showOptions = useCallback((input, options) => {
    push([{ k: "in", cwd: S.current.cwd, text: input }, { k: "out", l: [[options.join("   "), "c-sub"]] }]);
  }, [push]);

  const clear = useCallback(() => setLines([]), []);
  const history = useCallback(() => S.current.history, []);

  return { lines, cwd, run, complete, showOptions, clear, history, promptPath: prettyPath };
}
