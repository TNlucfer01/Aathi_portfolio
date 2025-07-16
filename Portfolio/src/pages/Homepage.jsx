import Footer from "../Componets/Footer";
import Navbar from "../Componets/Navbar";
import About from "../pages/About";
import Projects from "../pages/Project";
import Skills from "./Skill";
function HomePage() {
  return (
    <div className={"font-jetbrain"} id="home">
      <header>
        <Navbar  />
      </header>
      <main>
        {/*update this*/}
        <About />
        {/*finish the old projects*/}
        <Projects />
        {/*know the skill you know  */}
        <Skills />
      </main>
      {/* //include a form for contacting   */}
      <Footer />
    </div>
  );
}

function HomeContent(){
  return (<>
  <div>
    home Content
  </div>
  </>)
}
export default HomePage;
