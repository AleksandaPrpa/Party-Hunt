import logo from "../assets/logo.svg";

function Header() {
  return (
    <div className="w-screen bg-amber-300 h-16 py-3 px-5 flex flex-row">
      <div className="w-4/8">
        <img src={logo} alt="logo" className="h-10" />
      </div>
      <div className="w-4/8 flex flex-row justify-between items-center">
        <a
          href="Profile"
          className="text-2xl text-indigo-900 font-poppins mx-5"
        >
          Profile
        </a>
        <a href="Find" className="text-2xl text-indigo-900 font-poppins mx-5">
          Find a Party
        </a>
        <a href="Throw" className="text-2xl text-indigo-900 font-poppins mx-5">
          Throw a party
        </a>
      </div>
    </div>
  );
}
export default Header;
