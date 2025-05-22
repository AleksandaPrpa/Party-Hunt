import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../utils/fetch";

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (user) {
      navigate("/findAParty");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let logged = false;

    try {
      const users = await fetchUsers();

      users.forEach((user) => {
        if (
          user.username === formData.username &&
          user.password === formData.password
        ) {
          const storage = formData.rememberMe ? localStorage : sessionStorage;
          storage.setItem(
            "loggedInUser",
            JSON.stringify({
              _id: user._id,
              username: user.username,
            })
          );

          logged = true;
          navigate("/findAParty");
          return;
        }
      });

      if (!logged) alert("Invalid username or password");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="flex justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLoginSubmit}
          className="bg-slate-800 p-6 shadow-md rounded-lg text-slate-100 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-cyan-500">
            Login
          </h2>

          <label className="block text-slate-300 font-medium">
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your username"
            />
          </label>

          <label className="block text-slate-300 font-medium">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your password"
            />
          </label>

          <label className="inline-flex items-center text-slate-300">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            Remember me
          </label>

          <button
            type="submit"
            className="w-full cursor-pointer bg-cyan-500 hover:bg-pink-500 text-slate-900 font-bold py-2 rounded-lg transition"
          >
            Log In
          </button>

          <p className="mt-4 text-center text-slate-300">
            Don’t have an account?{" "}
            <Link
              to="/profile/register"
              className="text-cyan-400 hover:underline cursor-pointer font-semibold"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Home;
