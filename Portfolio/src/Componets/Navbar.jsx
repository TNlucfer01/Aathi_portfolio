import { useState } from "react";
import { Link } from "react-scroll";

function Navitem({ to, children, onClick }) {
  return (
    <Link
      to={to}
      smooth={true}
      duration={500}
      offset={-70}
      onClick={onClick}
      className="lg:text-[#22C55E] md:text-[#22C55E] text-[#22C55E] cursor-pointer hover:text-[#E0E0E0] transition"
    >
      {children}
    </Link>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="w-full p-8 ">
      <nav className="flex items-center justify-between sm:p-4 p-2 top-0 sm:text-base border-b-2 border-green-400 shadow-md bg-black rounded-full ml-5 mr-5 overflow-hidden md:text-lg md:p-5">
        {/* Logo or Title (optional) */}
        <div className="text-white font-bold ml-2">Aathi Senthil</div>
                                                                                        
        {/* Hamburger Button for Mobile */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white text-2xl focus:outline-none mr-2"
        >
          ☰
        </button>

        {/* Nav Items (Desktop) */}
        <div className="hidden sm:flex space-x-6 items-center">
          <Navitem to="home">Home</Navitem>
          <Navitem to="about">About</Navitem>
          <Navitem to="projects">Projects</Navitem>
          <Navitem to="skills">Skills</Navitem>
          <Navitem to="footer">Contact</Navitem>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col sm:hidden bg-black text-white p-4 space-y-4 rounded-xl mx-5 mt-2 shadow-md">
          <Navitem to="home" onClick={closeMenu}>Home</Navitem>
          <Navitem to="about" onClick={closeMenu}>About</Navitem>
          <Navitem to="projects" onClick={closeMenu}>Projects</Navitem>
          <Navitem to="skills" onClick={closeMenu}>Skills</Navitem>
          <Navitem to="footer" onClick={closeMenu}>Contact</Navitem>
        </div>
      )}
    </div>
  );
}

export default Navbar;
