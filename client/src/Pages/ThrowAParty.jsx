import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function ThrowAParty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    ticket_price: 0,
    currency: "RSD",
    theme: "",
    location: "",
    city: "",
    type: "House",
    description: "",
    phone_number: "",
    start_time: "",
    end_time: "",
    age_limit: 18,
    vip_conditions: "",
    table_count: 0,
    tables_reserved: 0,
    capacity: 0,
    people_signed_up: 0,
    party_date: new Date(),
    reservation: [],
  });

  const formatDateToDDMMYYYY = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, party_date: date }));
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "ticket_price" ||
        name === "capacity" ||
        name === "table_count" ||
        name === "people_signed_up" ||
        name === "tables_reserved"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      reservation: [],
      party_date: formatDateToDDMMYYYY(formData.party_date),
    };

    try {
      const response = await fetch("http://localhost:5050/party", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to create party");
      }

      const result = await response.json();
      console.log("Party created:", result);
      alert("Party successfully created!");
      navigate("/findAParty");
    } catch (error) {
      console.error("Error creating party:", error);
      alert("Error: " + error.message);
    }
  }

  const isClub = formData.type === "Club";

  return (
    <div className="bg-orange-50 min-h-screen flex items-center justify-center p-0">
      <form
        onSubmit={handleSubmit}
        className="w-screen p-6 shadow-xl rounded-2xl space-y-4"
      >
        <h2 className="text-2xl text-stone-800 font-bold text-center mb-4">
          Throw A Party
        </h2>

        {[
          ["name", "Party Name"],
          ["ticket_price", "Ticket Price (e.g. 1500)"],
          ["theme", "Theme (e.g. Disco Night)"],
          ["location", "Location (Street/Area)"],
          ["city", "City"],
          ["phone_number", "Phone Number"],
          ["vip_conditions", "VIP Conditions (optional)"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="text-stone-700 font-medium block mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
        ))}

        <div>
          <label className="text-stone-700 font-medium block mb-1">
            Currency
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-black"
            required
          >
            <option value="RSD">RSD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label className="text-stone-700 font-medium block mb-1">
            Age Limit
          </label>
          <select
            name="age_limit"
            value={formData.age_limit}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-black"
            required
          >
            <option value={16}>16+</option>
            <option value={18}>18+</option>
            <option value={21}>21+</option>
          </select>
        </div>

        <div>
          <label className="text-stone-700 font-medium block mb-1">
            Party Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-black"
            required
          >
            <option value="House">House</option>
            <option value="Rave">Rave</option>
            <option value="Festival">Festival</option>
            <option value="Club">Club</option>
          </select>
        </div>

        {isClub ? (
          <div>
            <label className="text-stone-700 font-medium block mb-1">
              Number of tables
            </label>
            <input
              type="number"
              name="table_count"
              value={formData.table_count}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
        ) : (
          <div>
            <label className="text-stone-700 font-medium block mb-1">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
        )}

        <div>
          <label className="text-stone-700 font-medium block mb-1">
            Start Time
          </label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>

        <div>
          <label className="text-stone-700 font-medium block mb-1">
            End Time
          </label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Party Date
          </label>
          <DatePicker
            selected={formData.party_date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select party date"
            className="w-full p-3 border border-stone-300 rounded-lg text-black text-base focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
            calendarClassName="custom-datepicker"
            popperPlacement="bottom-start"
            popperModifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
            ]}
            withPortal
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-300 text-stone-800 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-amber-400 transition"
        >
          Create Party
        </button>
        <button
          className="w-full bg-amber-300 text-stone-800 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-amber-400 transition"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </form>
    </div>
  );
}

export default ThrowAParty;
