function HeaderNavBarButton({ children, href }) {
  return (
    <a
      href={href}
      className="text-2xl cursor-pointer hover:bg-yellow-400 hover:scale-130 duration-300 hover:text-indigo-900 text-indigo-800 font-Lexend sm:text-m w-screen md:w-auto px-4 py-2 flex justify-center items-center"
    >
      {children}
    </a>
  );
}

export default HeaderNavBarButton;
