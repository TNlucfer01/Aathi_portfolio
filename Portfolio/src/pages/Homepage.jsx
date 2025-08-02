import { Link } from "react-scroll";
import Footer from "../Componets/Footer";
import Navbar from "../Componets/Navbar";
import About from "../pages/About";
import Projects from "../pages/Project";
import Contact from "./Contact";
import Skills from "./Skill";

function HomePage() {
  return (
    <div
      className={
        "font-jetbrain  terminal-black   scroll-smooth duration-150 text-[#e0e0e0] "
      }
      id="home"
    >
      <header className="sticky top-0 z-100">
        <Navbar />
      </header>
      <main className="text-[#e0e0e0]  ">
        {/*update this*/}
        <HomeContent />
        <About />
        {/*finish the old projects*/}
        <Projects />
        {/*know the skill you know  */}
        <Skills />
      </main>
      {/* //include a form for contacting   */}
      <Contact />
      <Footer />
    </div>
  );
}

function HomeContent() {
  return (
    <div className=" lg:pt-20 md:pt-15 pt-10 m-10 ">
      <h2 className="lg:m-20  lg:ml-22    text-center  text-4xl mb-10   md:text-7xl lg:text-8xl  ">
        Code. Create. Conquer.
      </h2>
      <p
        className="lg:text-3xl md:text-2xl sm:text-xl text-base  md:pl-15 lg:pl-15 before:content-['>']  before:mr-1  before:text-green-400 "
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
      >
        <span className="text-terminal-blue "> echo</span> "Hey there, welcome
        to my digital den! Kick back and explore my world of code."
      </p>
      <Link
        to="projects"
        smooth={true}
         duration={500}
      offset={-70}
className="mt-5 h-13 cursor-pointer gap-1 px-4 p-2 flex justify-center font-mono font-light text-xl bg-gray-900 rounded-xl tracking-tight before:content-['>'] before:mr-1 before:text-green-400 hover:text-green-400 hover:shadow-lg transition-colors duration-150 sm:text-base md:text-xl md:ml-38 md:mr-38 lg:text-4xl lg:ml-38 lg:mr-38">    Run <span className="text-terminal-blue">cd</span> projects
      </Link>
    </div>
  );
}
export default HomePage;
