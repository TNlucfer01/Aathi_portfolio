import { profile, about } from "../data/system";

// Arch-style ascii logo
const LOGO = [
  "                   ",
  "         ▟█▙        ",
  "        ▟███▙       ",
  "       ▟█████▙      ",
  "      ▟███████▙     ",
  "     ▟█▛▀▀▀▜██▙     ",
  "    ▟█▛    ▜███▙    ",
  "   ▟██▇▇▇▇▇████▙    ",
  "  ▟████████████▙▙   ",
  " ▟███▛▘     ▝▜███▙  ",
  "▟██▛▘         ▝▜██▙ ",
];

function Row({ k, v }) {
  return (
    <div className="flex gap-2">
      <span className="c-mauve w-24 shrink-0">{k}</span>
      <span className="c-sub">{v}</span>
    </div>
  );
}

export default function Neofetch() {
  return (
    <div className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <pre
          className="c-blue text-[10px] sm:text-xs leading-none shrink-0 hidden sm:block"
          aria-hidden="true"
        >
          {LOGO.join("\n")}
        </pre>
        <div className="min-w-0">
          <p className="mb-1">
            <span className="c-green">{profile.user}</span>
            <span className="c-sub">@</span>
            <span className="c-green">{profile.host}</span>
          </p>
          <p className="c-sub mb-2">{"-".repeat(20)}</p>
          <Row k="name" v={profile.name} />
          <Row k="role" v={profile.title} />
          <Row k="os" v={profile.distro} />
          <Row k="wm" v={profile.wm} />
          <Row k="shell" v={profile.shell} />
          <Row k="editor" v={profile.editor} />
          <Row k="terminal" v={profile.terminal} />
          <Row k="location" v={profile.location} />
          <Row k="status" v={profile.uptime} />
          <div className="flex gap-1 mt-3">
            {["--base", "--red", "--peach", "--yellow", "--green", "--teal", "--blue", "--mauve"].map(
              (c) => (
                <span
                  key={c}
                  className="w-4 h-4 rounded-sm"
                  style={{ background: `var(${c})` }}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--surface0)" }}>
        <p className="c-green mb-2">
          <span className="c-mauve">$</span> cat about.txt
        </p>
        {about.map((line, i) => (
          <p key={i} className="c-text min-h-[1.1em]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
