import { useEffect, useRef, useState } from "react";
import { profile } from "../data/system";
import { prettyPath } from "../vm/fs";

function Prompt({ cwd }) {
  return (
    <>
      <span className="c-green font-bold">{profile.user}@{profile.host}</span>
      <span className="c-dim">:</span>
      <span className="c-blue">{prettyPath(cwd)}</span>
      <span className="c-sub">$ </span>
    </>
  );
}

const canHover = () => typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (min-width: 768px)").matches;

/** Renders the shared simulated shell session (see vm/useShell.js). */
export default function Terminal({ session, focused = true, autoFocus = false }) {
  const [value, setValue] = useState("");
  const [hIdx, setHIdx] = useState(-1);
  const draft = useRef("");
  const box = useRef(null);
  const input = useRef(null);

  // keep the newest output in view (scroll our own box, never the page)
  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [session.lines]);

  // focus follows the focused window — on desktop only, so phones don't pop a keyboard
  useEffect(() => {
    if ((autoFocus || focused) && canHover()) input.current?.focus({ preventScroll: true });
  }, [focused, autoFocus]);

  const onKeyDown = (e) => {
    const hist = session.history();
    if (e.key === "Enter") {
      session.run(value);
      setValue(""); setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      if (hIdx === -1) draft.current = value;
      const n = Math.min(hIdx + 1, hist.length - 1);
      setHIdx(n); setValue(hist[hist.length - 1 - n]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const n = hIdx - 1;
      setHIdx(n); setValue(n === -1 ? draft.current : hist[hist.length - 1 - n]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const r = session.complete(value);
      if (r.line !== value) setValue(r.line);
      else if (r.options.length) session.showOptions(value, r.options);
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault(); session.clear();
    } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault(); setValue(""); setHIdx(-1);
    }
  };

  return (
    <div
      ref={box}
      data-terminal
      className="h-full overflow-auto p-3 sm:p-4 text-xs sm:text-sm"
      onClick={() => { if (!window.getSelection()?.toString()) input.current?.focus({ preventScroll: true }); }}
    >
      {session.lines.map((ln, i) =>
        ln.k === "in" ? (
          <div key={i} className="term-pre">
            <Prompt cwd={ln.cwd} />
            <span className="c-text">{ln.text}</span>
          </div>
        ) : (
          <div key={i} className="term-pre">
            {ln.l.map(([t, c], j) => (c ? <span key={j} className={c}>{t}</span> : t))}
          </div>
        )
      )}
      <label className="flex items-baseline">
        <span className="shrink-0 whitespace-pre"><Prompt cwd={session.cwd} /></span>
        <input
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Terminal input. Type help for commands."
          className="flex-1 min-w-0 bg-transparent outline-none c-text"
          style={{ caretColor: "var(--accent)", font: "inherit", outline: "none" }}
        />
      </label>
    </div>
  );
}
