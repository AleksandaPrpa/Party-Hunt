import { Link } from "react-router-dom";
import Logo from "../assets/Logo";

function LogoOnlyHeader() {
  return (
    <div>
      <header className="w-full h-16 px-5 flex items-center justify-between bg-slate-700">
        <div className="flex items-center">
          <Link to="/">
            {/* <img src={logo} alt="logo" className="h-10" /> */}
            <Logo />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default LogoOnlyHeader;
