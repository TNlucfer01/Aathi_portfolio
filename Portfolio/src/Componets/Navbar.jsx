import { Link, Element } from "react-scroll";

function Navitem({ to, children }) {
  return (
    <Link  to={to}  smooth={true} className="nav-item text-[#e0e0e0]">
      {children}
      
    </Link>
  );
}
function Navbar() {
  return (
    <div className="">
      <nav className="nav-bar rounded-full  ml-5 mr-5">
        <Navitem to={"home"}>Home</Navitem>
        <Navitem to={"about"}>About</Navitem>
        <Navitem to={"projects"}>Project</Navitem>{" "}
        <Navitem to={"skills"}>Skill</Navitem>
        <Navitem to={"footer"}>Contact</Navitem>
      </nav>
    </div>
  );
}

export default Navbar;
