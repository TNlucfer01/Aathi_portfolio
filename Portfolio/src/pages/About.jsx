import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function About() {
	const [showContent, setShowContent] = useState(false);
	const [isRunning, setISRunning] = useState(false);
	const [hasRun, setHasRun] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => setShowContent(true), 2500);
		return () => clearTimeout(timer);
	}, []);

	const handlecodeExe = () => {
		if (hasRun) return;
		setISRunning(true);
		setTimeout(() => {
			setISRunning(false);
			setHasRun(false);
		}, 400);
	}

	return (
		<div
			id="about"
			className={`min-h-screen  rounded-2xl  text-terminal-white lg:p-8 md:p-8 md:mt-10 p-2  lg:mt-10  bg-cover bg-center `}
		>
			{/* <h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
        whoami
      </h2>
      <h2 className="text-4xl m-10 p-6 pl-10  mb-4 ">Aathi S</h2> */}
			<div>
				<h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
					<span className="text-terminal-blue ">whoami</span>: My Story
				</h2>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlecodeExe}
					disabled={hasRun, isRunning}
					className={`px-4 py-2 rounded-xl font-mono text-sm md:text-base border transition-all duration-200 cursor-pointer 
${hasRun ? "border-green-500 text-green-400 bg-green-950/30 cursor-default " :
							isRunning ? "border-yellow-500 text-yellow-400 bg-yellow-950/30 animate-pulse" :
								"border-cyan-500 text-cyan-300 hover:bg-cyan-950/50 hover:shadow-lg hover:shadow-cyan-500/20"}`} >
					{hasRunWhoami ? "Executed" : isRunning ? "Running..." : "Run Command"}
				</motion.button>
			</div>
			<motion.p

				initial={{ opacity: 0, y: 60 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.3 }}
				whileHover={{
					scale: 0.98,
					boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
				}}
				className="lg:mr-10 lg:border-4 md:border-3 border-2
               text-base rounded-2xl border-cyan-700 hover:bg-gray-900
               lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4
               lg:text-2xl md:text-xl leading-relaxed text-gray-200
               tracking-tight lg:mb-4 md:mb-3 mb-2"
			>
				I’m Aathi S, a final year engineering student from India with a
				passion for turning complex problems into elegant solutions.
				From writing my first C program to building dynamic web apps,
				I’ve fallen in love with the art of coding and the thrill of
				creating tech that makes a difference. My journey’s just
				beginning, and I’m excited to share where it’s taken me—and
				where I’m headed.
			</motion.p>
			<h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
				<span className="gap-1 text-terminal-blue"> ls -l</span> skills: What
				I’m Mastering
			</h2>
			<motion.p className="lg:mr-10  lg:border-4 md:border-3 border-2 transform hover:shadow-lg hover:scale-98 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900  text-base  duration-400 rounded-2xl border-cyan-700 lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4 lg:text-2xl md:text-xl leading-relaxed text-gray-200  tracking-tight lg:mb-4 md:mb-3 mb-2">
				I’m a versatile coder with a knack for problem-solving. My C programming skills power projects like a console Tic-Tac-Toe game, built with data structures like Red-Black Trees and graphs. I’m at home in Linux, scripting in Bash on Kali and diving into cybersecurity with tools like Autopsy. Web development is my new frontier—HTML, CSS, JavaScript, and React fuel my ability to craft dynamic interfaces. My fake news detection tool shows I can tackle real-world challenges with tech. Explore my projects to see what I can bring to the table!
			</motion.p>
			<h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
				<span className="gap-1 text-terminal-blue "> cat </span>
				passions.txt :What Drives Me
			</h2>
			<motion.p className="   lg:mr-10  lg:border-4 md:border-3 border-2 transform hover:shadow-lg hover:scale-98 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900  text-base  duration-400 rounded-2xl border-cyan-700 lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4 lg:text-2xl md:text-xl leading-relaxed text-gray-200  tracking-tight lg:mb-4 md:mb-3 mb-2">
				Beyond code, I’m driven by creativity and strategy. Gaming—whether outsmarting opponents in chess, raiding in Clash of Clans, or exploring Genshin Impact—sharpens my problem-solving. Anime like Monster and Classroom of the Elite inspires my focus, while novels like Lord of Mysteries and Nano Machine spark my imagination. These passions keep my ideas fresh and my energy high, fueling my drive to innovate.


			</motion.p>
			<h2 className="lg:text-4xl md:text-3xl text-xl lg:m-10  lg:p-6 md:p-6 md:m-10  before:content-['>']  before:mr-1  before:text-green-400 pl-10 mb-4 text-terminal-white ">
				<span className="gap-1 text-terminal-blue ">cd future && ls</span>:
				Where I’m Headed
			</h2>
			<motion.p initial={{ opacity: 0, y: 50 }}
				whileHover={{ scale: 0.98 }}
				transition={{ duration: 1.2 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }} className="   lg:mr-10  lg:border-4 md:border-3 border-2 transform hover:shadow-lg  hover:shadow-cyan-500 hover:bg-gray-900  text-base  duration-400 rounded-2xl border-cyan-700 lg:p-8 md:p-8 lg:ml-30 md:ml-30 mx-1 p-4 lg:text-2xl md:text-xl leading-relaxed text-gray-200  tracking-tight lg:mb-4 md:mb-3 mb-2">

				I’m on a path to become a top-tier full-stack developer and cybersecurity expert, building solutions that are robust, secure, and impactful. I’m eager to join innovative teams, learn from industry leaders, and contribute my skills to projects that push boundaries. Let’s connect and create something extraordinary together—check out my work and reach out!
			</motion.p>
		</div>
	);
}

export default About;
