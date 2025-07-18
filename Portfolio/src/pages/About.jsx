import { useEffect, useState } from "react";
import image from "../assets/react.svg";
import Navbar from "../Componets/Navbar";

function About() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      id="about"
      className={`min-h-screen  rounded-2xl  text-terminal-white p-8 mt-10  bg-cover bg-center `}
    >
      <h2 className="text-4xl m-10 p-6 before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white font-mono">
        whoami
      </h2>
      <h2 className="text-4xl m-10 p-6 pl-10  mb-4 ">Aathi S</h2>

      <h2 className="text-4xl m-10 p-6 before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white font-mono">
        <span className="gap-1 text-terminal-blue ">whoami</span>: My Story{" "}
      </h2>
      <p className="   mr-10  border-4 transform hover:scale-105 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900 hover:shadow  duration-400 rounded-2xl border-cyan-700 p-8 ml-30 [30px] text-2xl leading-relaxed text-gray-200 font-mono tracking-tight mb-4">
        Yo, I’m Aathi S, a 3rd-year engineering student from India, fueled by a
        love for tech and cracking complex puzzles—be it a gadget’s core or a C
        printf("Hello, World!");. That spark ignited my coding journey, and I’m
        fired up to share it with you!
      </p>
      <h2 className="text-4xl m-10 p-6 before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white font-mono">
        <span className="gap-1 text-terminal-blue"> ls -l</span> skills: What
        I’m Mastering
      </h2>
      <p className="   mr-10  border-4 transform hover:scale-105 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900 hover:shadow  duration-400 rounded-2xl border-cyan-700 p-8 ml-30 [30px] text-2xl leading-relaxed text-gray-200 font-mono tracking-tight mb-4">
        I’m a coder who delivers—my C skills shine with data structures like
        Red-Black Trees and graphs, powering projects like a console Tic-Tac-Toe
        game. I own Linux, scripting Bash in Kali and exploring cybersecurity
        with Autopsy. I’ve stepped into web dev with HTML, CSS, and JavaScript,
        and I’m tackling React to build dynamic UIs. My fake news detection tool
        proves I can solve real problems. Ready to see what I can do for you?
      </p>
      <h2 className="text-4xl m-10 p-6 before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white font-mono">
        <span className="gap-1 text-terminal-blue "> cat </span>
        passions.txt :What Drives Me
      </h2>
      <p className="   mr-10  border-4 transform hover:scale-105 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900 hover:shadow  duration-400 rounded-2xl border-cyan-700 p-8 ml-30 [30px] text-2xl leading-relaxed text-gray-200 font-mono tracking-tight mb-4">
        When I’m not coding, I’m chasing new challenges. I’m a gamer at heart
        plotting killer moves in chess, raiding in Clash of Clans, or diving
        into Genshin Impact’s epic world. Anime’s my creative fuel Monster and
        Classroom of the Elite are my jam. I’m also hooked on stories, devouring
        novels like Lord of Mysteries and Reverend Insanity, plus manhwa like
        Solo Leveling and Nano Machine. These passions keep my mind sharp and my
        ideas fresh. What’s your go-to way to unwind?
      </p>
      <h2 className="text-4xl m-10 p-6 before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white font-mono">
        <span className="gap-1 text-terminal-blue ">cd future && ls</span>:
        Where I’m Headed
      </h2>
      <p className="   mr-10  border-4 transform hover:scale-105 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900 hover:shadow  duration-400 rounded-2xl border-cyan-700 p-8 ml-30 [30px] text-2xl leading-relaxed text-gray-200 font-mono tracking-tight mb-4">
        I’m on a mission to become a full-force developer, crushing it in
        full-stack dev and cybersecurity. My goal? Build solutions that don’t
        just work—they shine, whether it’s bulletproof code or secure systems.
        I’m pumped to join cutting-edge teams, soak up knowledge from the pros,
        and bring my hustle to the table. Let’s build something epic
        together—hit me up and let’s make it happen!
      </p>
    </div>
  );
}

export default About;
