
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
<button className="px-5 py-2 bg-cyan-600 rounded-md font-medium">Login</button>
<button className="px-5 py-2 bg-cyan-600 rounded-md font-medium">Signup</button>
    </nav>
    </>
  )
}

export default Navbar