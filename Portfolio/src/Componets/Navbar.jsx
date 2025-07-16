
function Navitem({to,children}){
return (
        <a href={to} className="before:content-['>'] before:mr-1 before:text-terminal-green p-1 tracking-tight hover:text-shadow-green-700 px rounded-4xl font-mono font-light text-lg" >{children}</a>
);
}
function Navbar(){
    return(
        <nav className=" items-center p-4 sticky top-0 z-10 flex border-b-2  shadow-md justify-center space-x-6">
          <Navitem to={'#'}>Home</Navitem>
          <Navitem to={'#about'}>About</Navitem>
          <Navitem to={'#services'}>Services</Navitem>
          <Navitem to={'#projects'}>Project</Navitem>
          <Navitem to={"#contact"}>Contact</Navitem>
        </nav>
    )
}

export default Navbar;