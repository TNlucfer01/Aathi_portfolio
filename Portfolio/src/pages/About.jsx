import { useEffect, useState } from "react";


function About() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      id="about"
      className={`min-h-screen  rounded-2xl  text-terminal-white lg:p-8 md:p-8 md:mt-10 p-2  lg:mt-10  bg-cover bg-center `}
    >
      {/* <h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
        whoami
      </h2>
      <h2 className="text-4xl m-10 p-6 pl-10  mb-4 ">Aathi S</h2> */}

      <h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
        <span className="gap-1 text-terminal-blue ">whoami</span>: My Story{" "}
      </h2>
      <p className="   lg:mr-10  lg:border-4 md:border-3 border-2  hover:shadow-lg hover:scale-98 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900  text-base  duration-400 rounded-2xl border-cyan-700 lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4 lg:text-2xl md:text-xl leading-relaxed text-gray-200  tracking-tight lg:mb-4 md:mb-3 mb-2">

            I’m Aathi S, a 3rd-year engineering student from India with a passion for turning complex problems into elegant solutions. From writing my first C program to building dynamic web apps, I’ve fallen in love with the art of coding and the thrill of creating tech that makes a difference. My journey’s just beginning, and I’m excited to share where it’s taken me—and where I’m headed.</p>
      <h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
        <span className="gap-1 text-terminal-blue"> ls -l</span> skills: What
        I’m Mastering
      </h2>
      <p className="lg:mr-10  lg:border-4 md:border-3 border-2 transform hover:shadow-lg hover:scale-98 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900  text-base  duration-400 rounded-2xl border-cyan-700 lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4 lg:text-2xl md:text-xl leading-relaxed text-gray-200  tracking-tight lg:mb-4 md:mb-3 mb-2">
    I’m a versatile coder with a knack for problem-solving. My C programming skills power projects like a console Tic-Tac-Toe game, built with data structures like Red-Black Trees and graphs. I’m at home in Linux, scripting in Bash on Kali and diving into cybersecurity with tools like Autopsy. Web development is my new frontier—HTML, CSS, JavaScript, and React fuel my ability to craft dynamic interfaces. My fake news detection tool shows I can tackle real-world challenges with tech. Explore my projects to see what I can bring to the table!
            </p>
      <h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
        <span className="gap-1 text-terminal-blue "> cat </span>
        passions.txt :What Drives Me
      </h2>
      <p className="   lg:mr-10  lg:border-4 md:border-3 border-2 transform hover:shadow-lg hover:scale-98 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900  text-base  duration-400 rounded-2xl border-cyan-700 lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4 lg:text-2xl md:text-xl leading-relaxed text-gray-200  tracking-tight lg:mb-4 md:mb-3 mb-2">
      Beyond code, I’m driven by creativity and strategy. Gaming—whether outsmarting opponents in chess, raiding in Clash of Clans, or exploring Genshin Impact—sharpens my problem-solving. Anime like Monster and Classroom of the Elite inspires my focus, while novels like Lord of Mysteries and Nano Machine spark my imagination. These passions keep my ideas fresh and my energy high, fueling my drive to innovate.

 
      </p>
      <h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
        <span className="gap-1 text-terminal-blue ">cd future && ls</span>:
        Where I’m Headed
      </h2>
      <p className="   lg:mr-10  lg:border-4 md:border-3 border-2 transform hover:shadow-lg hover:scale-98 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900  text-base  duration-400 rounded-2xl border-cyan-700 lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4 lg:text-2xl md:text-xl leading-relaxed text-gray-200  tracking-tight lg:mb-4 md:mb-3 mb-2">

      I’m on a path to become a top-tier full-stack developer and cybersecurity expert, building solutions that are robust, secure, and impactful. I’m eager to join innovative teams, learn from industry leaders, and contribute my skills to projects that push boundaries. Let’s connect and create something extraordinary together—check out my work and reach out! 
      </p>
    </div>
  );
}

export default About;
