import AgeLimitBadge from "../UI/AgeLimitBadge";
import LinkButton from "../UI/LinkButton";

function FindAPartyListItem({
  id,
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
    return i % 2 ? "bg-orange-50 md:bg-orange-100" : "bg-orange-100";
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

  return (
    <div
      className={`md:w-80 md:my-10 md:rounded-2xl md:h-100 md:p-0 md:shadow-xl md:shadow-stone-400/40 w-screen h-auto p-4 text-2xl text-stone-700 ${setColor(
        id
      )} grid grid-rows-[auto_auto_auto_auto] grid-cols-1 gap-y-2`}
    >
      <div className="md:h-25 md:rounded-t-2xl md:p-4 md:w-full md:bg-amber-300 flex justify-between items-center">
        <h1 className="md:text-3xl md:w-6/8 self-start">{name}</h1>
        <AgeLimitBadge
          className={
            "flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-semibold"
          }
          age_limit={age_limit}
        />
      </div>

      <h2 className="justify-self-center">
        {ticket_price === 0
          ? `Ticket price: Free entry`
          : `Ticket price: ${ticket_price} ${currency}`}
      </h2>
      <h2 className="justify-self-center">{showCapacity(type)}</h2>
      <h2 className="justify-self-center">{location + ", " + city}</h2>

      <LinkButton to={`/findAParty/${id}`}>Show More</LinkButton>
    </div>
  );
}

export default FindAPartyListItem;
