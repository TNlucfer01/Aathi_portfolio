function Skill({skillName,skillLevel,skillExperience}) {
    return(<>
    <div >
      <span >{skillName}</span>
      <div>
        <p>Level: {skillLevel}</p>
        <p>Experience: {skillExperience} years</p>
      </div>
    </div>
    
    </>)
}

function Skills() {
  const skills = [
    {
      name: "skill1",
      level:"level1",
      experiance:"2"
    },
    {
      name: "skill2",
      level:"level1",
      experiance:"2"
    },
    {
      name: "skill3",
      level:"level1",
      experiance:"2"
    },
    {
      name: "skill4",
      level:"level1",
      experiance:"2"
    }
  ];
  return (
    <>  <div >
      {skills.map((skill, index) => (
        <Skill
          key={index}
          skillName={skill.name}
          skillLevel={skill.level}
          skillExperience={skill.experience}
        />
      ))}
    </div></>
  );
}

export default Skills;
