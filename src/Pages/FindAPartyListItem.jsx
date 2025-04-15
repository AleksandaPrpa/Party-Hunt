import Button from "../Components/UI/Button";

function FindAPartyListItem({
  name,
  ticket_price,
  currency,
  theme,
  location,
  type,
  id,
}) {
  function setColor(i) {
    if (i % 2) return "bg-orange-50";
    else return "bg-orange-100";
  }

  return (
    <div
      className={`w-screen h-auto p-4 text-2xl text-stone-700 ${setColor(
        id
      )} grid grid-rows-[auto_auto_auto_auto] grid-cols-1 gap-y-2`}
    >
      <h1 className="justify-self-start">{name}</h1>
      <h2 className="justify-self-center">{`Cena: ${
        ticket_price + " " + currency
      }`}</h2>
      <h2 className="justify-self-center">{location}</h2>
      <Button>Show more</Button>
    </div>
  );
}

export default FindAPartyListItem;
