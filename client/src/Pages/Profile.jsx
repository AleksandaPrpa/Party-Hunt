import { useEffect, useState } from "react";
import { deleteUserAccount, getPartiesByUser_Id } from "../utils/fetch";
import ProfilePartyListItem from "./ProfilePartyListItem";
import ProfileEdit from "./ProfileEdit";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [parties, setParties] = useState([]);
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      setUser(loggedInUser);

      getPartiesByUser_Id(loggedInUser._id)
        .then((userParties) => setParties(userParties))
        .catch((err) => console.error(err));
    } else {
      navigate("/");
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/");
  }

  async function handleDeleteAccount() {
    if (!user?._id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await deleteUserAccount(user._id);

      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("loggedInUser");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete account. Please try again later.");
    }
  }

  if (!user) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen gap-6 bg-slate-900">
      <div className="md:w-1/8 w-full space-y-4 bg-slate-800 flex flex-col items-center p-4 md:p-2 text-center shadow-md">
        <h1 className="text-2xl font-bold uppercase text-slate-100">
          {user.username}
        </h1>

        {isEditModeOpen && (
          <ProfileEdit setIsEditModeOpen={setIsEditModeOpen} />
        )}

        <button
          className="bg-cyan-500 text-slate-100 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-500 transition cursor-pointer"
          onClick={() => setIsEditModeOpen(!isEditModeOpen)}
        >
          {isEditModeOpen ? "Close Edit Profile" : "Edit Profile"}
        </button>

        <button
          onClick={handleSignOut}
          className="bg-cyan-500 text-slate-100 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-500 transition cursor-pointer mt-4"
        >
          Sign Out
        </button>

        <button
          onClick={handleDeleteAccount}
          className="bg-pink-500 text-slate-100 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-600 transition cursor-pointer mt-2"
        >
          Delete Account
        </button>
      </div>

      <div className="md:w-7/8 w-full space-y-4 py-4 md:items-start items-center text-center md:text-start md:px-0 px-2 text-slate-100">
        <h1 className="text-2xl font-semibold">Your Parties</h1>
        {parties.length === 0 ? (
          <p className="text-teal-400">You haven’t created any parties yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {parties.map((party) => (
              <ProfilePartyListItem key={party._id} party={party} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
