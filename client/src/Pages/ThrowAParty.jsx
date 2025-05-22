import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { createParty, fetchUsers } from "../utils/fetch";

function ThrowAParty() {
  const navigate = useNavigate();
  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(sessionStorage.getItem("loggedInUser"));

  const [formData, setFormData] = useState({
    user_name: loggedInUser.username,
    user_id: "",
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
    const users = await fetchUsers();
    const user = users.find((u) => u.username === loggedInUser.username);
    if (!user) throw new Error("User not found");

    const dataToSend = {
      ...formData,
      user_id: user._id,
      reservation: [],
      party_date: formatDateToDDMMYYYY(formData.party_date),
    };

    try {
      await createParty(dataToSend);
      alert("Party successfully created!");
      navigate("/findAParty");
    } catch (error) {
      console.error("Error creating party:", error);
      alert("Error: " + error.message);
    }
  }

  const isClub = formData.type === "Club";

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-slate-800 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center  text-slate-100 mb-6">
          Throw A Party
        </h2>

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            Party Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <label className="text-slate-100 font-medium block mb-1">
          Ticket Price
        </label>
        <div className="flex">
          <input
            type="number"
            name="ticket_price"
            value={formData.ticket_price}
            onChange={handleChange}
            required
            className="w-6/8 p-2 rounded-lg border mr-4 border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
            className="w-2/8 p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="RSD">RSD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">Theme</label>
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            Location (Street/Area)
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            VIP Conditions (optional)
          </label>
          <input
            type="text"
            name="vip_conditions"
            value={formData.vip_conditions}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            Age Limit
          </label>
          <select
            name="age_limit"
            value={formData.age_limit}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value={16}>16+</option>
            <option value={18}>18+</option>
            <option value={21}>21+</option>
          </select>
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            Party Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="House">House</option>
            <option value="Rave">Rave</option>
            <option value="Festival">Festival</option>
            <option value="Club">Club</option>
          </select>
        </div>

        {isClub ? (
          <div>
            <label className="text-slate-100 font-medium block mb-1">
              Number of tables
            </label>
            <input
              type="number"
              name="table_count"
              value={formData.table_count}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        ) : (
          <div>
            <label className="text-slate-100 font-medium block mb-1">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        )}

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            Start Time
          </label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-slate-100 font-medium block mb-1">
            End Time
          </label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-100 mb-1">
            Party Date
          </label>
          <DatePicker
            selected={formData.party_date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select party date"
            className=" w-full p-3 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm placeholder:text-slate-400"
            calendarClassName="custom-datepicker bg-slate-900 text-slate-100 rounded-lg shadow-lg border border-teal-400"
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
          className="w-full bg-cyan-500 text-slate-100 cursor-pointer font-bold py-3 rounded-lg shadow-md hover:bg-pink-500 transition"
        >
          Create Party
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full bg-cyan-500 text-slate-100 cursor-pointer font-bold py-3 rounded-lg shadow-md hover:bg-pink-500 transition"
        >
          Go back
        </button>
      </form>
    </div>
  );
}

export default ThrowAParty;
