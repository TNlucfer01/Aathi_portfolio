function Skill({skillName,skillLevel,skillExperience ,skillProject}) {
    return(
<div className="p-2 group hover:scale-105 transition-all ease-in-out hover:shadow-cyan-500 hover:bg-gray-900 hover:shadow  duration-400  border-cyan-700 m-2 border-3 rounded-2xl">
  <span className="block text-center  items-center">{skillName}</span>
  
  <div className="hidden group-hover:block">
    <p>Level: {skillLevel}</p>
    <p>Experience: {skillExperience} years</p>
    <p>Projects created: {skillProject.join(", ")}</p>
  </div>
</div>
    
    )
}

// ['React', 'Java', 'C', 'MySQL', 'linux', 'Tailwind'

   function Skills() {
  const skills = [
 {
    name: " Kali Linux",
    level: "Intermediate",
    experience:2, // in years
    projects: ["Forensic recovery", "Package creation","mobile rooting using ADB"]
  },
  {
    name:"data Analytics ",
    level:" intermediate",
    experience:1,
    projects:["Fake new detection"],
  },
  {
    name: "React",
    level: "Beginner",
    experience: 0.5,
    projects: [ "Portfolio"]
  },
  {
    name: "MySQL",
    level: "Intermediate",
    experience: 1,
    projects: ["Student DBMS project"]
  },
  {
    name:"C",
    level:"Advanced",
    experience:1.5,
    projects:["Tic tac toe"," jpg Image Recover"]
  },
  {
    name:"python",
    level:"Advanced",
    experience:1,
    projects:["webpage using flask"," A NLP Fake News Detection","pdf2Doc"]
  },
  {
    name:"bash",
    level:"beginner",
    experience:0.5,
    projects:["CPU Speed Controller",]
  },
  {
    name:"java",
    level:"beginner",
    experience:0,
    projects:[]
  },{
    name:"html css",
    level:"intermediate",
    experience:0.5,
    projects:[]

  },
  {
    name:"javascript",
    level:"intermediate",
    experience:0.5,
    projects:["this page you are seeing right now "]
  },
  {
    name:"Neovim",
    level:"intermediate",
    experience:1,
    projects:[" the neo is tunned by me "]
  }
  
  ];  
  return (
    <>  <div id="skills" className=" mt-10 p-9 rounded-3xl items-center mr-38 ml-38 border-cyan-700  border-4" style={{ background: '#1E1E2E' }}>
  <h2 className="text-3xl gap-2"><span className="text-3xl  before:content-['>']  before:mr-1  before:text-green-400  text-terminal-blue mb-6">ls -l</span> Skill</h2>
  <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">  {skills.map((skill, index) => (
        <Skill
          key={index}
          skillName={skill.name}
          skillLevel={skill.level}
          skillExperience={skill.experience}
          skillProject={skill.projects}
        />
      ))}</div>
    </div></>
  );
}
export default Skills;