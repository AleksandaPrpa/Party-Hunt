import { Link } from "react-router-dom";

function HeaderNavBarButton({ children, href, setIsOpen }) {
  return (
    <Link
      to={href}
      onClick={() => setIsOpen(false)}
      className="text-2xl cursor-pointer h-full hover:bg-slate-600 duration-300 hover:text-pink-400 text-cyan-400 font-semibold sm:text-2xl w-screen md:w-auto px-4 py-2 flex justify-center items-center rounded"
    >
      {children}
    </Link>
  );
}

export default HeaderNavBarButton;
