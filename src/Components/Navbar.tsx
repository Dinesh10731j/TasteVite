import { useState } from "react";

const Navbar = () => {
  const [isopen, setIsopen] = useState(true);

  const handleClick = () => {
    setIsopen(!isopen);
  };

  return (
    <>
      <nav className="flex fex-row justify-evenly items-center  py-4 ">
        <h1 className="font-serif text-4xl font-medium tracking-wide">
          TasteVite
        </h1>
        <ul
          className={`flex flex-col gap-5 m font-sans ${
            isopen ? "translate-x-48" : "translate-x-0"
          } bg-slate-300 px-3 py-2 font-medium text-2xl fixed right-0 top-20 md:flex-row  md:relative md:top-0`}
        >
          <li>Home</li>
          <li>Find Receipe</li>
          <li>Buy</li>
        </ul>
        <div className="flex flex-row gap-7">

        <button className="px-2 py-2 t bg-cyan-500 rounded-md font-medium md:px-3">
          Login
        </button>
        <button className="px-2 py-2 bg-cyan-500 rounded-md font-medium md:px-3">
          Signup
        </button>

        </div>
        <div>
        <svg
          className={`block cursor-pointer md:hidden`}
          onClick={handleClick}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" fill="#000" />
          <rect y="11" width="24" height="2" fill="#000" />
          <rect y="18" width="24" height="2" fill="#000" />
        </svg>

        </div>
       
        
      </nav>
    </>
  );
};

export default Navbar;
