import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to, isPadding, isWidth }) {
  const navigate = useNavigate();
  const className =
    `md:w-auto md:h-14 md:text-lg md:py-3 md:px-6 md:justify-self-center cursor-pointer m-4 ${
      isWidth
        ? "w-40 h-14 flex items-center justify-center justify-self-center"
        : "w-auto h-auto"
    } ${isPadding && "p-4"} text-center select-none rounded-lg ` +
    "bg-cyan-500 text-slate-100 font-bold uppercase shadow-md shadow-cyan-700/50 " +
    "transition-all duration-300 hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-500/50 " +
    "focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none " +
    "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
