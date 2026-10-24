import { useState } from "react";
import emailjs from "emailjs-com";
import { Send } from "lucide-react";
import { socials, profile } from "../data/system";

const SERVICE = "service_9rpl40b";
const TEMPLATE = "template_1qh5tgq";
const PUBLIC_KEY = "6H3mpiREFfmOu2NQm";

export default function ContactPane() {
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'err'

  const send = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.sendForm(SERVICE, TEMPLATE, e.target, PUBLIC_KEY).then(
      () => {
        setStatus("ok");
        e.target.reset();
      },
      () => setStatus("err")
    );
  };

  const field =
    "w-full rounded-lg px-3 py-2 text-sm outline-none transition-all duration-150";
  const fieldStyle = {
    background: "color-mix(in srgb, var(--crust) 70%, transparent)",
    border: "1px solid color-mix(in srgb, var(--surface1) 80%, transparent)",
    color: "var(--text)",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-0">
      {/* form */}
      <form onSubmit={send} className="p-4 sm:p-6 overflow-auto">
        <p className="c-sub text-sm mb-4">
          <span className="c-mauve">$</span> ./contact.sh --send
        </p>
        <div className="mb-4">
          <label htmlFor="c-name" className="block text-sm mb-1 c-blue">
            name:
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            placeholder="your name"
            className={field}
            style={fieldStyle}
            onFocus={(e) => (e.target.style.boxShadow = "var(--glow)")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="c-email" className="block text-sm mb-1 c-blue">
            email:
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={field}
            style={fieldStyle}
            onFocus={(e) => (e.target.style.boxShadow = "var(--glow)")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="c-msg" className="block text-sm mb-1 c-blue">
            message:
          </label>
          <textarea
            id="c-msg"
            name="message"
            required
            rows={5}
            placeholder="say hi…"
            className={field + " resize-none"}
            style={fieldStyle}
            onFocus={(e) => (e.target.style.boxShadow = "var(--glow)")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-4 py-2 rounded-lg text-sm transition-all duration-150 disabled:opacity-60"
          style={{ background: "color-mix(in srgb, var(--surface0) 90%, transparent)", color: "var(--accent)" }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--glow)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <Send size={14} className="inline -mt-0.5 mr-1.5" aria-hidden="true" />
          {status === "sending" ? "sending…" : "send message"}
        </button>
        <p className="mt-3 text-sm min-h-[1.2em]" aria-live="polite">
          {status === "ok" && <span className="c-green">✓ message sent — thanks, I'll reply soon.</span>}
          {status === "err" && (
            <span className="c-red">✗ couldn't send. Email me directly at {profile.email}.</span>
          )}
        </p>
      </form>

      {/* socials */}
      <div
        className="p-4 sm:p-6 overflow-auto md:border-l glass-inset"
        style={{ borderColor: "color-mix(in srgb, var(--surface1) 55%, transparent)" }}
      >
        <p className="c-sub text-sm mb-4">
          <span className="c-mauve">$</span> cat ~/.config/links
        </p>
        <div className="space-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
              style={{ background: "color-mix(in srgb, var(--crust) 70%, transparent)", border: "1px solid color-mix(in srgb, var(--surface1) 80%, transparent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--glow)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <span className="c-text text-sm">{s.label}</span>
              <span className="c-sub text-xs truncate">{s.handle} ↗</span>
            </a>
          ))}
        </div>
        <p className="c-sub text-xs mt-6 leading-relaxed">
          Open to internships and collaboration on Linux, full-stack and AI projects.
          Based in {profile.location}.
        </p>
      </div>
    </div>
  );
}
