
import Tic from "../assets/tic_win.png"
import FakeNews from "../assets/fakenews.png"
import ImageRecovery from "../assets/data-recovery.png"
import SmartCampus from "../assets/smartcampus.png"

function Project({ projectTittle, projectDescription, image, projectlink }) {
  return (
    <div className={`  border-cyan-700 hover:shadow-cyan-500 hover:bg-gray-900 hover:shadow  duration-400 group hover:scale-105   min-h-80 bg-[url(${image})]  justify-center  flex-col flex items-center m-8 p-9 border-4 rounded-3xl`}>
      <h1 className="p-2 text-4xl text-terminal-blue">{projectTittle}</h1>
      <p className="pl-2 mt-5 text-3xl">{projectDescription}</p>
      <img 
        src={image}
        className="m-2 mt-5 group-hover:block group-hover:scale-75 ease-in-out duration-300 hidden  hover:scale-105  hover:shadow-2xs  p-2 "
        alt="will show just refresh the page"
        width={420}
        height={120}
      />
      <a className=" font-light border-2 border-[#2b2b4d] mt-10 hover:border-cyan-800 hover:bg-gray-900 hover:ease-in-out hover:scale-100  duration-300 transform-all p-5 rounded-3xl bg-[#2b2b4d] " target="_blank" href={projectlink}>
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
    <div id="projects" className="pl-30   mt-10 rounded-2xl  pr-30">
      <h2 className="text-4xl mt-10 ">Projects devoloped by me </h2>
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
