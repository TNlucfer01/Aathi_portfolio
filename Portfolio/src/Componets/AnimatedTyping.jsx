import { TypeAnimation } from "react-type-animation";

/**
 * AnimatedTyping - A terminal-style typing animation component.
 * Uses react-type-animation to cycle through sequences.
 *
 * Props:
 *  sequence  – array passed directly to TypeAnimation (text + delay pairs)
 *  speed     – typing speed (default 50)
 *  className – extra Tailwind / CSS classes
 */
function AnimatedTyping({ sequence, speed = 50, className = "" }) {
  return (
    <TypeAnimation
      sequence={
        sequence ?? [
          "Full-Stack Developer",
          1500,
          "Cybersecurity Enthusiast",
          1500,
          "Open-Source Contributor",
          1500,
          "Problem Solver",
          1500,
        ]
      }
      wrapper="span"
      speed={speed}
      repeat={Infinity}
      className={className}
    />
  );
}

export default AnimatedTyping;
