import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderNavBarButton from "./HeaderNavBarButton";
import { useWindowWidth } from "../utils/helpers";
import Logo from "../assets/Logo";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const width = useWindowWidth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  if (width < 768) {
    return (
      <>
        <header className="w-full h-16 px-5 flex items-center justify-between bg-slate-700">
          {/* Logo i hamburger */}
          <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
            <Link to="/">
              <Logo />
            </Link>

            {/* Hamburger (mobile only) */}
            <div className="md:hidden">
              <button onClick={toggleMenu} aria-label="Toggle menu">
                <svg
                  className="w-8 h-8 text-cyan-400 cursor-pointer"
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

            {/* Desktop nav */}
            <nav className="hidden md:flex space-x-6">
              <HeaderNavBarButton setIsOpen={setIsOpen} href="/profile">
                Profile
              </HeaderNavBarButton>
              <HeaderNavBarButton setIsOpen={setIsOpen} href="/findAParty">
                Find a Party
              </HeaderNavBarButton>
              <HeaderNavBarButton setIsOpen={setIsOpen} href="/throwAParty">
                Throw a Party
              </HeaderNavBarButton>
            </nav>
          </div>
        </header>

        {isOpen && (
          <nav className="w-full bg-slate-700 flex flex-col items-center space-y-4 py-4 md:hidden max-w-screen-xl mx-auto">
            <HeaderNavBarButton setIsOpen={setIsOpen} href="/profile">
              Profile
            </HeaderNavBarButton>
            <HeaderNavBarButton setIsOpen={setIsOpen} href="/findAParty">
              Find a Party
            </HeaderNavBarButton>
            <HeaderNavBarButton setIsOpen={setIsOpen} href="/throwAParty">
              Throw a Party
            </HeaderNavBarButton>
          </nav>
        )}
      </>
    );
  } else {
    return (
      <header className="w-full h-16 px-5 flex items-center justify-between bg-slate-700">
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            <svg
              className="w-8 h-8 text-cyan-400 cursor-pointer"
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

        {/* Desktop nav */}
        <nav className="hidden h-full md:flex space-x-4">
          <HeaderNavBarButton setIsOpen={setIsOpen} href="/profile">
            Profile
          </HeaderNavBarButton>
          <HeaderNavBarButton setIsOpen={setIsOpen} href="/findAParty">
            Find a Party
          </HeaderNavBarButton>
          <HeaderNavBarButton setIsOpen={setIsOpen} href="/throwAParty">
            Throw a party
          </HeaderNavBarButton>
        </nav>

        {/* Mobile nav dropdown */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-slate-700 flex flex-col items-center space-y-4 py-4 md:hidden z-50 transition-all duration-300">
            <HeaderNavBarButton setIsOpen={setIsOpen} href="/profile">
              Profile
            </HeaderNavBarButton>
            <HeaderNavBarButton setIsOpen={setIsOpen} href="/findAParty">
              Find a Party
            </HeaderNavBarButton>
            <HeaderNavBarButton setIsOpen={setIsOpen} href="/throwAParty">
              Throw a party
            </HeaderNavBarButton>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
