function Skill({ skillName, skillLevel, skillExperience, skillProject }) {
	return (
		<div className="p-2  lg:hover:scale-105 transition-all ease-in-out lg:hover:shadow-cyan-500 bg-gray-900 shadow-cyan-500 lg:hover:bg-gray-900 lg:hover:shadow-lg  duration-400  border-cyan-700 m-2 border-3 rounded-2xl">
			<span className="block text-center text-[#22C55E] items-center">{skillName}</span>
			<div className="lg:hidden  group-hover:block cursor-pointer">
				<p><span className="text-[#1E90FF]">Level:</span> {skillLevel}</p>
				<p><span className="text-[#D3D3D3]">Experience:</span> {skillExperience} years</p>
				<p><span className="text-[#32CD32]">Projects :</span> {skillProject.join(", ")}</p>
			</div>
		</div>

	)
}


function Skills() {
	const skills = [
		{
			name: " Kali Linux",
			level: "Intermediate",
			experience: 2, // in years
			projects: ["Forensic recovery", "Package creation", "mobile rooting using ADB"]
		},
		{
			name: "data Analytics ",
			level: " intermediate",
			experience: 1,
			projects: ["Fake new detection"],
		},
		{
			name: "React",
			level: "intermediate",
			experience: 1,
			projects: ["Portfolio"]
		},
		{
			name: "MySQL",
			level: "Intermediate",
			experience: 1,
			projects: ["Student DBMS project"]
		},
		{
			name: "C",
			level: "Advanced",
			experience: 1.5,
			projects: ["Tic tac toe", " jpg Image Recover"]
		},
		{
			name: "python",
			level: "Advanced",
			experience: 1,
			projects: ["webpage using flask", " A NLP Fake News Detection", "pdf2Doc"]
		},
		{
			name: "bash",
			level: "beginner",
			experience: 0.5,
			projects: ["CPU Speed Controller",]
		},
		{
			name: "java",
			level: "beginner",
			experience: 1,
			projects: ["Htshare"]
		}, {
			name: "html css",
			level: "intermediate",
			experience: 1,
			projects: ["Portfolio"]

		},
		{
			name: "javascript",
			level: "intermediate",
			experience: 1,
			projects: ["this page you are seeing right now "]
		},
		{
			name: "Neovim",
			level: "intermediate",
			experience: 1,
			projects: [" my DIY Code Editor"]
		}

	];
	return (
		<div id="skills" className="lg:mt-10 lg:p-9 md:p-8 m-2 duration-400 mx-3 md:mt-9 mt-7 p-5 rounded-3xl items-center lg:mr-38 lg:ml-38 md:mr-35 md:ml-35 border-cyan-700  lg:border-4 md:border-3 border-2 " style={{ background: '#1E1E2E' }}>
			<h2 className="text-3xl gap-2"><span className="text-3xl  before:content-['>']  before:mr-1  before:text-green-400  text-terminal-blue mb-6">ls -l</span> Skill</h2>
			<div className="grid mt-10 group grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">  {skills.map((skill, index) => (
				<Skill
					key={index}
					skillName={skill.name}
					skillLevel={skill.level}
					skillExperience={skill.experience}
					skillProject={skill.projects}
				/>
			))}</div>
		</div>
	);
}
export default Skills;
