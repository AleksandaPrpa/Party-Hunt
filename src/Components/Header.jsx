import logo from "../assets/logo.svg";
import HeaderNavBarButton from "./HeaderNavBarButton";

function Header() {
  return (
    <div className="w-screen bg-amber-300 h-16 py-4 px-5 flex flex-row align-middle">
      <div className="w-5/8">
        <img src={logo} alt="logo" className="h-10" />
      </div>
      <div className="w-3/8 flex flex-row justify-between">
        <HeaderNavBarButton href="Profile">Profile</HeaderNavBarButton>
        <HeaderNavBarButton href="Find">Find a Party</HeaderNavBarButton>
        <HeaderNavBarButton href="Throw">Throw a party</HeaderNavBarButton>
      </div>
    </div>
  );
}

export default Header;
