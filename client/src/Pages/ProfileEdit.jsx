import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getUserById } from "../utils/helpers";

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
      const response = await fetch(`http://localhost:5050/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone_number: formData.phone_number,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

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

  if (!user) return <div>Loading...</div>;

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
            className={`flex-grow border px-2 py-1 text-sm text-stone-700 rounded
              ${
                editableFields[field.key]
                  ? "bg-white border-amber-300"
                  : "bg-gray-100 border-gray-300"
              }`}
          />
          <Pencil
            className="text-gray-500 hover:text-amber-400 cursor-pointer"
            size={16}
            onClick={() => enableEdit(field.key)}
          />
        </div>
      ))}

      {hasChanges() && (
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="bg-amber-300 text-stone-800 font-semibold py-2 px-4 rounded-lg shadow hover:bg-amber-400 transition"
          >
            Save changes
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
