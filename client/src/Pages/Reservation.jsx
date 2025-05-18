import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch(`http://localhost:5050/party/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
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
      //   const isTableParty = party.table_count > 0;

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
        const tables_reserved = party.tables_reserved + quantity;
        const response = await fetch(`http://localhost:5050/party/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tables_reserved }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Failed to update party");
        }
        const responseData = await response.json();
        console.log("Updated party:", responseData);
      } else {
        const people_signed_up = party.people_signed_up + quantity;
        const response = await fetch(`http://localhost:5050/party/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ people_signed_up }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Failed to update party");
        }
        const responseData = await response.json();
        console.log("Updated party:", responseData);
      }
      const response = await fetch(`http://localhost:5050/party/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservation }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to update party");
      }

      const responseData = await response.json();
      console.log("Updated party:", responseData);
      alert("Reservation successful!");
      navigate("/findAParty");
    } catch (error) {
      console.error("Reservation failed:", error);
      alert("Failed to make reservation. Try again later.");
    }
  };

  if (!party) return <p className="text-center mt-10">Loading party...</p>;

  const isTableParty = party.table_count !== null && party.table_count > 0;
  const maxQuantity = isTableParty
    ? party.table_count - (party.tables_reserved || 0)
    : party.capacity - (party.people_signed_up || 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 shadow-xl rounded-2xl bg-stone-800 space-y-4 mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Reservation for: {party.name}
      </h2>

      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg"
      />

      <label className="block font-medium">
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
        className="w-full p-2 border rounded-lg"
      />
      <p className="text-sm text-gray-400">
        Maximum available: {maxQuantity} {isTableParty ? "tables" : "people"}
      </p>

      <button
        type="submit"
        className="block mx-auto cursor-pointer select-none rounded-lg bg-amber-300 py-3 px-6 text-center align-middle font-sans text-lg font-bold uppercase text-stone-700 shadow-md shadow-amber-300/20 transition-all hover:shadow-amber-300/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Submit reservation
      </button>
      <button
        className="block mx-auto cursor-pointer select-none rounded-lg bg-amber-300 py-3 px-6 text-center align-middle font-sans text-lg font-bold uppercase text-stone-700 shadow-md shadow-amber-300/20 transition-all hover:shadow-amber-300/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </form>
  );
}

export default Reservation;
