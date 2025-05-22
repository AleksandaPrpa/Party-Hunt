import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 px-6">
      <div className="max-w-lg w-full p-8 bg-slate-800 rounded-2xl shadow-lg text-center space-y-6">
        <h1 className="text-4xl font-bold text-cyan-500">Oops!</h1>
        <p className="text-lg">Something went wrong.</p>
        <p className="text-sm italic text-slate-100 opacity-80">
          {error?.data || error?.message || "Unknown error occurred."}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="inline-block bg-cyan-500 hover:bg-pink-500 text-slate-900 font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default Error;
