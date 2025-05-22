import AgeLimitBadge from "../UI/AgeLimitBadge";
import LinkButton from "../UI/LinkButton";

function FindAPartyListItem({
  id,
  color_id,
  name,
  ticket_price,
  currency,
  location,
  city,
  type,
  age_limit,
  table_count,
  tables_reserved,
  capacity,
  people_signed_up,
}) {
  const remainingTables = table_count - tables_reserved;
  const remainingSpots = capacity - people_signed_up;
  function setColor(i) {
    return i % 2 ? "bg-slate-800 md:bg-slate-800" : "bg-slate-900";
  }

  function showCapacity(type) {
    switch (type) {
      case "House":
        return `Remaining spots: ${remainingSpots}`;
      case "Rave":
        return `Remaining spots: ${remainingSpots}`;
      case "Festival":
        return `Remaining spots: ${remainingSpots}`;
      case "Club":
        return `Remaining tables: ${remainingTables}`;
      default:
        return "Error";
    }
  }

  const noMoreSpace =
    (type === "Club" && remainingTables <= 0) ||
    (type !== "Club" && remainingSpots <= 0);

  return (
    <div
      className={`md:w-80 cursor-default md:my-10 md:rounded-2xl md:h-auto md:p-0 md:shadow-xl md:shadow-black/20 w-full max-w-md h-auto p-0 text-2xl
    ${
      noMoreSpace
        ? "text-slate-500 bg-slate-400 cursor-not-allowed select-none"
        : ""
    }
    ${setColor(color_id)} 
    grid grid-rows-[auto_auto_auto_auto] grid-cols-1 gap-y-4
    transition duration-300 ease-in-out
    hover:shadow-2xl hover:scale-[1.03]
  `}
      style={noMoreSpace ? { filter: "grayscale(70%)", opacity: 0.6 } : {}}
    >
      <div
        className={`md:h-28 md:rounded-t-2xl md:p-6 md:w-full w-screen p-3 flex justify-between items-center
      bg-slate-600 shadow-md`}
      >
        <h1
          className={`md:text-3xl md:w-6/8 self-start font-semibold
        ${noMoreSpace ? "line-through text-slate-400" : "text-slate-100"}`}
        >
          {name}
        </h1>
        <AgeLimitBadge
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold cursor-default
        ${noMoreSpace ? "bg-slate-700 text-white" : "bg-slate-700 text-white"}`}
          age_limit={age_limit}
        />
      </div>

      <h2
        className={`justify-self-center text-lg font-medium ${
          noMoreSpace ? "line-through" : "text-slate-200"
        }`}
      >
        {ticket_price === 0
          ? `Ticket price: Free entry`
          : `Ticket price: ${ticket_price} ${currency}`}
      </h2>
      <h2
        className={`justify-self-center text-lg font-medium ${
          noMoreSpace ? "line-through" : "text-slate-200"
        }`}
      >
        {showCapacity(type)}
      </h2>
      <h2
        className={`justify-self-center text-lg font-medium ${
          noMoreSpace ? "line-through" : "text-slate-200"
        }`}
      >
        {location + ", " + city}
      </h2>

      {noMoreSpace ? (
        <button
          disabled
          className="bg-slate-600 text-slate-400 cursor-not-allowed rounded-md py-3 px-6 w-full text-center font-semibold"
        >
          No More Space
        </button>
      ) : (
        <LinkButton to={`/findAParty/${id}`} isWidth={true}>
          Show More
        </LinkButton>
      )}
    </div>
  );
}

export default FindAPartyListItem;
