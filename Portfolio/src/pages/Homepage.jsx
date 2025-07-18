import Footer from "../Componets/Footer";
import Navbar from "../Componets/Navbar";
import About from "../pages/About";
import Projects from "../pages/Project";
import Contact from "./Contact";
import Skills from "./Skill";

function HomePage() {
  return (
    <div
      className={"font-jetbrain  terminal-black   scroll-smooth duration-150 text-[#e0e0e0] "}
      id="home"
    >
      <header className="sticky top-0">
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
    <div className=" pt-20 m-10">
      <h2 className="m-20  ml-22   text-center text-9xl  ">Code. Create. Conquer.</h2>
      <p
        className="text-3xl  pl-15 before:content-['>']  before:mr-1  before:text-green-400 0"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
      >

 <span className="text-terminal-blue "> echo</span> "Hey there, welcome to my digital den! Kick back and explore my world of code."      </p>
            <a href="#projects" className="mt-5 ml-38  mr-38 text-3xl h-13  gap-1 justify-center nav-item flex" >Run <span className="text-terminal-blue">cd</span> projects</a>

    </div>
  );
}
export default HomePage;
