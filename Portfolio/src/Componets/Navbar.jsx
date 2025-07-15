
function Navitem({to,children}){
return (
        <a href={to} className="p-1" >{children}</a>
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