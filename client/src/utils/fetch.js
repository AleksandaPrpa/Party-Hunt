// --- USER-RELATED FUNCTIONS ---

//Fetch user by ID
export async function getUserById(userId) {
  const response = await fetch(`http://localhost:5050/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

//Check if username or email already exists
export async function checkDuplicateUser(username, email) {
  try {
    const response = await fetch("http://localhost:5050/users");
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();

    const usernameExists = users.some((user) => user.username === username);
    const emailExists = users.some((user) => user.email === email);

    return { usernameExists, emailExists };
  } catch (error) {
    console.error("Error checking for duplicate user:", error);
    return { usernameExists: false, emailExists: false };
  }
}

//Create a new user
export async function createUser(userData) {
  const response = await fetch("http://localhost:5050/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

//Delete user account by ID
export async function deleteUserAccount(userId) {
  try {
    const userParties = await getPartiesByUser_Id(userId);

    for (const party of userParties) {
      await deletePartyById(party._id);
    }

    const response = await fetch(`http://localhost:5050/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete account");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting user and their parties:", error);
    throw error;
  }
}
//Fetch all users
export async function fetchUsers() {
  const res = await fetch("http://localhost:5050/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

//Update user data by ID
export async function updateUser(id, updatedData) {
  const response = await fetch(`http://localhost:5050/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
}

// --- PARTY-RELATED FUNCTIONS ---

//Fetch all parties
export async function getParties() {
  const response = await fetch("http://localhost:5050/party");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

//Fetch a party by its ID
export async function getPartyById(id) {
  const response = await fetch(`http://localhost:5050/party/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

//Fetch parties created by a specific user
export async function getPartiesByUser_Id(userId) {
  try {
    const res = await fetch("http://localhost:5050/party");
    if (!res.ok) throw new Error("Failed to fetch parties");

    const allParties = await res.json();
    return allParties.filter((party) => party.user_id === userId);
  } catch (error) {
    console.error("Error in getPartiesByUser_Id:", error);
    throw error;
  }
}
// Update a Party
export async function updatePartyReservation(id, reservation) {
  const response = await fetch(`http://localhost:5050/party/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reservation }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to update party");
  }
  return response.json();
}
// Update a Party table
export async function updatePartyTablesReserved(id, tables_reserved) {
  const response = await fetch(`http://localhost:5050/party/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tables_reserved }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to update party");
  }
  return response.json();
}
// Update a Party people singed up
export async function updatePartyPeopleSignedUp(id, people_signed_up) {
  const response = await fetch(`http://localhost:5050/party/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ people_signed_up }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to update party");
  }
  return response.json();
}
// Create a new party
export async function createParty(data) {
  const response = await fetch("http://localhost:5050/party", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to create party");
  }

  return response.json();
}
// Delete a party by id
export async function deletePartyById(id) {
  const response = await fetch(`http://localhost:5050/party/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete party.");
  }

  return response.json();
}
