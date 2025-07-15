import { NavLink } from "react-router-dom";

function Navitem({to,children}){
return (
        <NavLink to={to} className="p-1" >{children}</NavLink>
);
}
function Navbar(){
    return(
        <nav className=" items-center">
          <Navitem to={'/'}>Home</Navitem>
          <Navitem to={'/about'}>About</Navitem>
          <Navitem to={'/services'}>Services</Navitem>
          <Navitem to={'/projects'}>Project</Navitem>
          <Navitem to={"/contact"}>Contact</Navitem>
        </nav>
    )
}

export default Navbar;