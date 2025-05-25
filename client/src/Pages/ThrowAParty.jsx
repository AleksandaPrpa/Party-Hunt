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

  const [errors, setErrors] = useState({});

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

  function validateField(name, value) {
    let error = "";

    switch (name) {
      case "name":
      case "theme":
        if (!/^[\w\s\d\.\,\!\?]{3,}$/.test(value)) {
          error = "Must be at least 3 characters.";
        }
        break;

      case "location":
        if (!/^[\w\s\d\.\-\,]{3,}$/.test(value)) {
          error = "Invalid address format.";
        }
        break;

      case "city":
        if (!/^[A-Za-zčćšđžČĆŠĐŽ\s-]{2,}$/.test(value)) {
          error = "City must contain only letters.";
        }
        break;

      case "phone_number":
        if (!/^\+?\d{6,15}$/.test(value)) {
          error = "Enter a valid phone number.";
        }
        break;

      case "ticket_price":
      case "capacity":
      case "table_count":
        if (Number(value) < 0) {
          error = "Value must be 0 or more.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    Object.entries(formData).forEach(([key, value]) =>
      validateField(key, value)
    );
    const hasErrors = Object.values(errors).some((err) => err);

    if (hasErrors) {
      alert("Please fix the form errors before submitting.");
      return;
    }

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
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-6">
          Throw A Party
        </h2>

        {[
          { name: "name", label: "Party Name" },
          { name: "theme", label: "Theme" },
          { name: "location", label: "Location (Street/Area)" },
          { name: "city", label: "City" },
          { name: "phone_number", label: "Phone Number" },
          {
            name: "vip_conditions",
            label: "VIP Conditions (optional)",
            required: false,
          },
        ].map(({ name, label, required = true }) => (
          <div key={name}>
            <label className="text-slate-100 font-medium block mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              onBlur={(e) => validateField(name, e.target.value)}
              required={required}
              className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Ticket Price + Currency */}
        <div>
          <label className="text-slate-100 font-medium block mb-1">
            Ticket Price
          </label>
          <div className="flex">
            <input
              type="number"
              name="ticket_price"
              value={formData.ticket_price}
              onChange={handleChange}
              onBlur={(e) => validateField("ticket_price", e.target.value)}
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
          {errors.ticket_price && (
            <p className="text-red-500 text-sm mt-1">{errors.ticket_price}</p>
          )}
        </div>

        {/* Age Limit */}
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

        {/* Party Type */}
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

        {/* Club-only or other type */}
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
              onBlur={(e) => validateField("table_count", e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.table_count && (
              <p className="text-red-500 text-sm mt-1">{errors.table_count}</p>
            )}
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
              onBlur={(e) => validateField("capacity", e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
            )}
          </div>
        )}

        {/* Time */}
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
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100"
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
            className="w-full p-2 rounded-lg border border-teal-400 bg-slate-800 text-slate-100"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-100 mb-1">
            Party Date
          </label>
          <DatePicker
            selected={formData.party_date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select party date"
            className="w-full p-3 rounded-lg border border-teal-400 bg-slate-800 text-slate-100"
            calendarClassName="custom-datepicker bg-slate-900 text-slate-100"
            withPortal
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-cyan-500 text-slate-100 font-bold py-3 cursor-pointer rounded-lg shadow-md hover:bg-pink-500 transition"
        >
          Create Party
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full bg-cyan-500 text-slate-100 font-bold py-3 cursor-pointer rounded-lg shadow-md hover:bg-pink-500 transition"
        >
          Go back
        </button>
      </form>
    </div>
  );
}

export default ThrowAParty;
