import { useState } from "react";
import logo from "../assets/logo.svg";
import HeaderNavBarButton from "./HeaderNavBarButton";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`w-full h-16 px-5 flex items-center justify-between bg-amber-300`}
    >
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-10" />
      </div>
      <div className="md:hidden ">
        <button onClick={toggleMenu}>
          <svg
            className="w-8 h-8 text-indigo-900  cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      <nav className="hidden md:flex space-x-4">
        <HeaderNavBarButton href="Profile">Profile</HeaderNavBarButton>
        <HeaderNavBarButton href="Find">Find a Party</HeaderNavBarButton>
        <HeaderNavBarButton href="Throw">Throw a party</HeaderNavBarButton>
      </nav>
      {isOpen && (
        <div
          className={`absolute top-16 left-0 w-full bg-amber-300 flex flex-col items-center space-y-4 py-4 md:hidden z-50 transition-all duration-300`}
        >
          <HeaderNavBarButton href="Profile">Profile</HeaderNavBarButton>
          <HeaderNavBarButton href="Find">Find a Party</HeaderNavBarButton>
          <HeaderNavBarButton href="Throw">Throw a party</HeaderNavBarButton>
        </div>
      )}
    </header>
  );
}

export default Header;
