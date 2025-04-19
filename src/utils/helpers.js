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
