import { useState, useEffect } from "react";
export function dateFormat(format, day, month, year) {
  switch (format) {
    case "dd-mm-yyyy":
      return `${day}-${month}-${year}`;
    case "dd.mm.yyyy":
      return `${day}.${month}.${year}.`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    case "mm/dd/yyyy":
      return `${month}/${day}/${year}`;
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`;
    case "yyyy/mm/dd":
      return `${year}/${month}/${day}`;
    case "Month dd, yyyy":
      return `${getMonthName(month)} ${day}, ${year}`;
    default:
      return "Invalid format!";
  }
}

function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[parseInt(month, 10) - 1] || "Invalid Month";
}

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
export async function getPartiesByUser_Id(userId) {
  try {
    const res = await fetch("http://localhost:5050/party");
    if (!res.ok) throw new Error("Failed to fetch parties");

    const allParties = await res.json();
    const userParties = allParties.filter((party) => party.user_id === userId);

    return userParties;
  } catch (error) {
    console.error("Error in getPartiesByUser_Id:", error);
    throw error;
  }
}
