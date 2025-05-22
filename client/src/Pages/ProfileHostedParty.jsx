import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";
import { deletePartyById, getPartyById } from "../utils/fetch";

function ProfileHostedParty() {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchParty() {
      try {
        const data = await getPartyById(id);
        setParty(data);
      } catch (error) {
        console.error("Error fetching party:", error);
      }
    }

    fetchParty();
  }, [id]);
  async function handleDeleteParty() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this party?"
    );
    if (!confirmed) return;

    try {
      await deletePartyById(id);
      alert("Party deleted successfully.");
      navigate(-1);
    } catch (error) {
      console.error("Error deleting party:", error);
      alert("An error occurred while deleting the party.");
    }
  }
  if (!party) return <Loader />;

  const {
    name,
    ticket_price,
    currency,
    theme,
    location,
    city,
    type,
    description,
    phone_number,
    start_time,
    end_time,
    age_limit,
    vip_conditions,
    capacity,
    table_count,
    party_date,
    reservation = [],
  } = party;

  return (
    <div className="bg-slate-900 text-slate-100 min-w-full min-h-screen p-6 space-y-6 max-w-3xl mx-auto rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold border-b border-cyan-500 pb-2">
        {name}
      </h1>

      <div className="space-y-2">
        <p>
          <strong className="text-cyan-400">Theme:</strong> {theme}
        </p>
        <p>
          <strong className="text-cyan-400">Type:</strong> {type}
        </p>
        <p>
          <strong className="text-cyan-400">Location:</strong> {location},{" "}
          {city}
        </p>
        <p>
          <strong className="text-cyan-400">Date:</strong> {party_date}
        </p>
        <p>
          <strong className="text-cyan-400">Start:</strong> {start_time}
        </p>
        <p>
          <strong className="text-cyan-400">End:</strong> {end_time}
        </p>
        <p>
          <strong className="text-cyan-400">Ticket Price:</strong>{" "}
          {ticket_price} {currency}
        </p>
        <p>
          <strong className="text-cyan-400">Phone:</strong> {phone_number}
        </p>
        <p>
          <strong className="text-cyan-400">Age Limit:</strong> {age_limit}
        </p>
        <p>
          <strong className="text-cyan-400">VIP Conditions:</strong>{" "}
          {vip_conditions || (
            <span className="italic text-slate-500">None</span>
          )}
        </p>
        <p>
          <strong className="text-cyan-400">
            {type === "Club" ? "Table Count" : "Capacity"}:
          </strong>{" "}
          {type === "Club" ? table_count : capacity}
        </p>
      </div>

      <div>
        <strong className="text-cyan-400 block mb-2 text-lg">
          Description:
        </strong>
        <p className="p-4 rounded-lg bg-opacity-20  shadow-inner">
          {description}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-500 border-b border-cyan-500 pb-1">
        Reservations
      </h2>
      {reservation.length === 0 ? (
        <p className="italic text-slate-500">No reservations yet.</p>
      ) : (
        <table className="w-full text-left border border-cyan-500 rounded-lg shadow-sm overflow-hidden">
          <thead className="bg-slate-800 bg-opacity-40 text-slate-100">
            <tr>
              <th className="p-3 border border-cyan-500">First Name</th>
              <th className="p-3 border border-cyan-500">Last Name</th>
              <th className="p-3 border border-cyan-500">Phone</th>
              <th className="p-3 border border-cyan-500">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {reservation.map((res, i) => (
              <tr
                key={res.firstName + res.lastName}
                className={i % 2 === 0 ? "bg-slate-700" : "bg-slate-600"}
              >
                <td className="p-3 border border-cyan-500">{res.firstName}</td>
                <td className="p-3 border border-cyan-500">{res.lastName}</td>
                <td className="p-3 border border-cyan-500">{res.phone}</td>
                <td className="p-3 border border-cyan-500">{res.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center md:justify-start">
        <button
          onClick={handleDeleteParty}
          className="bg-pink-500 text-slate-100 font-semibold py-3 px-6 rounded-lg shadow hover:bg-pink-600 transition cursor-pointer w-full md:w-auto"
        >
          Delete Party
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-cyan-500 text-slate-900 font-semibold py-3 px-6 rounded-lg shadow hover:bg-cyan-600 transition cursor-pointer w-full md:w-auto"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ProfileHostedParty;
