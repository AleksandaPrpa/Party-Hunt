import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    let loged = false;
    try {
      const res = await fetch("http://localhost:5050/users");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await res.json();
      console.log("Users:", users);
      users.forEach((user) => {
        if (
          user.username === formData.username &&
          user.password === formData.password
        ) {
          if (formData.rememberMe) {
            localStorage.setItem(
              "loggedInUser",
              JSON.stringify({
                _id: user._id,
                username: user.username,
              })
            );
          } else {
            sessionStorage.setItem(
              "loggedInUser",
              JSON.stringify({
                _id: user._id,
                username: user.username,
              })
            );
          }

          loged = true;
          navigate("/findAParty");
          return;
        } else {
          loged = false;
        }
      });
      if (!loged) alert("Invalid username or password");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-orange-50 p-4">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">
          Login
        </h2>

        <label className="block mb-2 text-stone-700 font-medium">
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Enter your username"
          />
        </label>

        <label className="block mb-4 text-stone-700 font-medium">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Enter your password"
          />
        </label>

        <label className="inline-flex items-center mb-4 text-stone-700">
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
          className="w-full bg-amber-300 hover:bg-amber-400 text-stone-800 font-bold py-3 rounded-lg transition"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-stone-700">
          Don’t have an account?{" "}
          <Link
            to="/profile/create"
            className="text-amber-500 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Home;
