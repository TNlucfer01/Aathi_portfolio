
import Tic from "../assets/tic_win.png"
import FakeNews from "../assets/fakenews.png"
import ImageRecovery from "../assets/data-recovery.png"
import SmartCampus from "../assets/smartcampus.png"

function Project({ projectTittle, projectDescription, image, projectlink }) {
  return (
    <div className={` border-cyan-700 shadow-cyan-500  lg:hover:shadow-cyan-500 lg:hover:bg-gray-900 bg-gray-900 lg:hover:shadow-lg  duration-400 group hover:scale-98   min-h-80 justify-center  flex-col flex items-center lg:m-8 lg:p-9 md:m-6 md:p-7 m-2 p-3 lg:border-4 md:border-3 border-2 rounded-3xl`}>
      <h1 className="p-2 lg:text-4xl md:text-3xl text-2xl text-terminal-blue">{projectTittle}</h1>
      <p className="lg:pl-2 mt-5 lg:text-3xl ">{projectDescription}</p>
     <img 
  src={image}
  className="m-2 mt-5 hidden group-hover:block group-hover:scale-90 transition-transform duration-300 p-2 rounded-xl shadow-md"
  alt="project preview"
  width={420}
  height={120}
/>
    <a className="  animation:pulse font-light border-2 border-[#2b2b4d] mt-10 hover:border-cyan-800 hover:bg-gray-900 hover:ease-in-out hover:scale-100  duration-300 transform-all p-5 rounded-3xl bg-[#2b2b4d] " target="_blank" href={projectlink}>
        For more info
      </a>
    </div>
  );
}

function Projects(){
  const userprojects = [
    {
      tittle: "TIC TAC TOE",
      description:
        " a simple Tic Tac Toe game developed by C with SDL2 graphics library. The game provides a clean, interactive graphical interface where two players can compete in turns. Designed to be lightweight and fast.",
      image: Tic,
      link: "https://github.com/TNlucfer01/Tic_tac_toe.git",
    },
    {
      tittle:"Fake News Detection ",
      description:"In this project, we have used various natural language processing techniques and machine learning algorithms to classify fake news articles using sci-kit libraries from python.",
      image:FakeNews,
      link:"https://github.com/TNlucfer01/fake_news_detection"
    },
    {
      tittle:"Smart Campus",
      description:" a react application that is to improve the college education enviroment",
      image:SmartCampus,
      link:"https://github.com/TNlucfer01/smart-campus"
    },
    {
      tittle:"Jpeg Recoverer ",
      description:"A image recover using the C  ",
      image:ImageRecovery,
      link:"https://github.com/code50/172607889/tree/main/recover"
    }
  ];
  return (
<div
  id="projects"
  className="lg:pt-28 pt-2 ml-1 lg:px-32 md:px-24 lg:mt-20 md:mt-8 mt-10 rounded-2xl">      
<h2 className="lg:text-4xl text-white font-bold mb-4 md:text-3xl md:mt-8 text-2xl ml-8 lg:mt-10 ">Projects </h2>

            {userprojects.map((item, idx) =>  {
        return (
          <Project key={idx}
            projectTittle={item.tittle}
            projectDescription={item.description}
            projectlink={item.link}
            image={item.image}
          />
        );
      })}
    </div>
  );
}
export default Projects;
