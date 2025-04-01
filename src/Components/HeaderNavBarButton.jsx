function HeaderNavBarButton({ children, href }) {
  return (
    <a
      href={href}
      className="text-2xl cursor-pointer text-indigo-900 mx-5 w-1/3 font-Lexend sm:text-s"
    >
      {children}
    </a>
  );
}

export default HeaderNavBarButton;
