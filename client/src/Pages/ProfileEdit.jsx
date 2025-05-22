import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getUserById } from "../utils/fetch";
import Loader from "../UI/Loader";

function ProfileEdit({ setIsEditModeOpen }) {
  const [user, setUser] = useState(null);
  const [editableFields, setEditableFields] = useState({
    username: false,
    email: false,
    phone_number: false,
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("loggedInUser")) ||
      JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (stored?._id) {
      getUserById(stored._id)
        .then((fetchedUser) => {
          setUser(fetchedUser);
          setFormData({
            username: fetchedUser.username || "",
            email: fetchedUser.email || "",
            phone_number: fetchedUser.phone_number || "",
          });
        })
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, []);

  const enableEdit = (key) => {
    setEditableFields((prev) => ({ ...prev, [key]: true }));
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const hasChanges = () => {
    if (!user) return false;
    return (
      user.username !== formData.username ||
      user.email !== formData.email ||
      user.phone_number !== formData.phone_number
    );
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
      };

      await updatedData(user._id, updatedData);

      const updatedUser = await getUserById(user._id);
      setUser(updatedUser);

      setEditableFields({
        username: false,
        email: false,
        phone_number: false,
      });
      setIsEditModeOpen(false);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  if (!user) return <Loader />;

  const fields = [
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Phone number", key: "phone_number" },
  ];

  return (
    <div className="w-full space-y-4 mt-4">
      {fields.map((field) => (
        <div key={field.key} className="flex items-center space-x-2">
          <input
            type="text"
            value={formData[field.key]}
            disabled={!editableFields[field.key]}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className={`flex-grow border px-3 py-2 text-sm rounded font-medium
          ${
            editableFields[field.key]
              ? "bg-slate-900 border-cyan-500 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              : "bg-slate-900 border-teal-400 text-slate-500 cursor-not-allowed"
          } transition-colors duration-200 ease-in-out`}
            placeholder={`Enter ${field.label || field.key}`}
          />
          <Pencil
            className="text-teal-400 hover:text-pink-500 cursor-pointer transition-colors duration-200"
            size={18}
            onClick={() => enableEdit(field.key)}
          />
        </div>
      ))}

      {hasChanges() && (
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleSave}
            className="bg-cyan-500 text-slate-100 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-pink-500 cursor-pointer transition duration-300"
          >
            Save changes
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
