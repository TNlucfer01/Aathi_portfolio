import Footer from "../Componets/Footer";
import Navbar from "../Componets/Navbar";
import About from "../pages/About";
import Projects from "../pages/Project";
import Skills from "../pages/Serivices";
function HomePage() {
  return (
    <div>
      <header>
        {/* //change the navbar  */}
        <Navbar />
      </header>
      <main>
        {/* update this  */}
        <About />
        {/* finish the old projects  */}
        <Projects />
        {/* know the skill you know  */}
        <Skills />
      </main>
      {/* //include a form for contacting   */}
      <Footer />
    </div>
  );
}

export default HomePage;
