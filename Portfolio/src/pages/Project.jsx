
import Tic from "../assets/tic_win.png"

function Project({ projectTittle, projectDescription, image, projectlink }) {
  return (
    <div className="min-h-80">
      <h1 className="p-2">{projectTittle}</h1>
      <p className="pl-2">{projectDescription}</p>
      <img 
        src={Tic}
        className="m-2 p-2 "
        alt="will show just refresh the page"
      />
      <a className="underline font-light " target="_blank" href={projectlink}>
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
        "This project is a simple Tic Tac Toe game developed using C programming language and the SDL2 (Simple DirectMedia Layer) graphics library. The game provides a clean, interactive graphical interface where two players can compete in turns. Designed to be lightweight and fast, this project demonstrates the practical use of SDL for 2D game development and user interaction.",
      image: "/Portfolio/src/assets/tic_win.png",
      link: "https://github.com/TNlucfer01/Tic_tac_toe.git",
    },
  ];
  return (
    <div id="projects">
      {userprojects.map((item, idx) => {
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
