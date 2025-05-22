import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";
import {
  getPartyById,
  updatePartyPeopleSignedUp,
  updatePartyReservation,
  updatePartyTablesReserved,
} from "../utils/fetch";

function Reservation() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    quantity: 1,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const quantity = Number(formData.quantity);

      const reservation = [
        ...(party.reservation || []),
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          quantity,
        },
      ];

      if (party.type === "Club") {
        await updatePartyTablesReserved(id, party.tables_reserved + quantity);
      } else {
        await updatePartyPeopleSignedUp(id, party.people_signed_up + quantity);
      }

      await updatePartyReservation(id, reservation);

      alert("Reservation successful!");
      navigate("/findAParty");
    } catch (error) {
      console.error("Reservation failed:", error);
      alert("Failed to make reservation. Try again later.");
    }
  };

  if (!party) return <Loader />;

  const isTableParty = party.table_count !== null && party.table_count > 0;
  const maxQuantity = isTableParty
    ? party.table_count - (party.tables_reserved || 0)
    : party.capacity - (party.people_signed_up || 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 shadow-xl shadow-black/30 rounded-2xl bg-slate-900 text-slate-100 space-y-5 mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-2">
        Reservation for: {party.name}
      </h2>

      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <label className="block font-medium text-slate-200">
        {isTableParty ? "Number of tables" : "Number of people"}
      </label>
      <input
        type="number"
        name="quantity"
        min="1"
        max={maxQuantity}
        value={formData.quantity}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <p className="text-sm text-slate-400">
        Maximum available: {maxQuantity} {isTableParty ? "tables" : "people"}
      </p>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-cyan-500 py-3 px-6 text-center font-bold uppercase text-slate-900 shadow-md hover:bg-pink-500 transition-all"
      >
        Submit reservation
      </button>

      <button
        type="button"
        className="w-full cursor-pointer rounded-lg bg-cyan-500 py-3 px-6 text-center font-bold uppercase text-slate-900 shadow-md hover:bg-pink-500 transition-all"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </form>
  );
}

export default Reservation;
