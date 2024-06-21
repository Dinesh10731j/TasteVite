
const Navbar = () => {
  return (
    <>
    
    <nav className="flex fex-row justify-evenly items-center  py-4 ">
<h1 className="font-serif text-4xl font-medium tracking-wide">TasteVite</h1>
<ul className="flex flex-col gap-5 md:flex-row font-sans font-medium text-2xl">
    <li>Home</li>
    <li>Find Receipe</li>
    <li>Buy</li>
</ul>
<button className="px-5 py-2 t bg-cyan-500 rounded-md font-medium">Login</button>
<button className="px-5 py-2 bg-cyan-500 rounded-md font-medium">Signup</button>
<svg className="block md:hidden" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <rect y="4" width="24" height="2" fill="#000"/>
  <rect y="11" width="24" height="2" fill="#000"/>
  <rect y="18" width="24" height="2" fill="#000"/>

</svg>

    </nav>
    </>
  )
}

export default Navbar