import { useEffect, useState } from "react";
import { getPartiesByUser_Id } from "../utils/helpers";
import ProfilePartyListItem from "./ProfilePartyListItem";
import ProfileEdit from "./ProfileEdit";

function Profile() {
  const [user, setUser] = useState(null);
  const [parties, setParties] = useState([]);
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);

  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      setUser(loggedInUser);

      getPartiesByUser_Id(loggedInUser._id)
        .then((userParties) => setParties(userParties))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen gap-6 bg-orange-50 ">
      <div className="md:w-1/8 w-full space-y-4 md:bg-orange-100 flex flex-col items-center p-4 text-center">
        <h1 className="text-2xl font-bold uppercase text-stone-800">
          {user.username}
        </h1>
        {isEditModeOpen && (
          <ProfileEdit setIsEditModeOpen={setIsEditModeOpen} />
        )}
        <button
          className="bg-amber-300 text-stone-800 font-semibold py-2 px-4 rounded-lg shadow hover:bg-amber-400 transition cursor-pointer"
          onClick={() => setIsEditModeOpen(!isEditModeOpen)}
        >
          {isEditModeOpen ? "Close Edit Profile" : "Edit Profile"}
        </button>
      </div>

      <div className="md:w-7/8 w-full space-y-4 py-4 md:items-start items-center text-center md:text-start md:px-0 px-2">
        <h2 className="text-xl font-semibold text-stone-700">Your Parties</h2>
        {parties.length === 0 ? (
          <p className="text-stone-500">You haven’t created any parties yet.</p>
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
