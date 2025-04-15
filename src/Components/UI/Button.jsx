function Button({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="select-none rounded-lg bg-amber-300 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-stone-700 shadow-md shadow-amber-300/20 transition-all hover:shadow-lg hover:shadow-amber-300/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      {children}
    </button>
  );
}

export default Button;
