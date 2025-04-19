import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    "md:w-2xs md:h-14 md:text-lg md:py-3 md:px-4 md:justify-self-center cursor-pointer  m-4 select-none rounded-lg bg-amber-300 py-3 px-6 text-center align-middle font-sans text-lg font-bold uppercase text-stone-700 shadow-md shadow-amber-300/20 transition-all hover:shadow-lg hover:shadow-amber-300/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

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
