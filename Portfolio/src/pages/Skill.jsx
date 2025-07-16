function Skill({skillName,skillLevel,skillExperience}) {
    return(<>
    <div className="p-2 m-2 border ">
      <span >{skillName}</span>
      <div>
        <p>Level: {skillLevel}</p>
        <p>Experience: {skillExperience} years</p>
      </div>
    </div>
    
    </>)
}

// ['React', 'Java', 'C', 'MySQL', 'linux', 'Tailwind'

   function Skills() {
  const skills = [
    {
      name: "Linux",
      level:"level1",
      experiance:"2"
    },
    {
      name: "Java",
      level:"level1",
      experiance:"2"
    },
    {
      name: "Python",
      level:"level1",
      experiance:"2"
    },
    {
      name: "C",
      level:"level1",
      experiance:"2"
    }
  ];  
  return (
    <>  <div id="skill"  className=" min-h-screen p-6 flex  flex-col items-center mt-8 border-2 rounded border-b-slate-800">
      <h2 className="text-4xl  top-1 ">ls -l Skill/</h2>
    <div>  {skills.map((skill, index) => (
        <Skill
          key={index}
          skillName={skill.name}
          skillLevel={skill.level}
          skillExperience={skill.experience}
        />
      ))}</div>
    </div></>
  );
}
export default Skills;