import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkDuplicateUser, createUser } from "../utils/fetch";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone_number: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (user) {
      navigate("/findAParty");
    }
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password, confirmPassword, email, phone_number } =
      formData;

    if (!username || !password || !confirmPassword || !email || !phone_number) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { usernameExists, emailExists } = await checkDuplicateUser(
        username,
        email
      );

      if (usernameExists || emailExists) {
        setError(
          usernameExists && emailExists
            ? "Username and email already in use."
            : usernameExists
            ? "Username already in use."
            : "Email already in use."
        );
        return;
      }

      const newUser = { username, password, email, phone_number };
      await createUser(newUser);

      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      navigate("/findAParty");
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 text-slate-100 shadow-lg p-8 rounded-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-cyan-500">
            Register
          </h2>

          {error && <p className="text-pink-500 text-center">{error}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-cyan-500 text-slate-900 font-semibold py-2 rounded-lg hover:bg-pink-500 transition"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full cursor-pointer bg-cyan-500 text-slate-900 font-semibold py-2 rounded-lg hover:bg-pink-500 transition"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
