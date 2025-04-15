import FindAPartyListItem from "./FindAPartyListItem";

const FakePartyList = [
  {
    id: 1,
    name: "Party 1",
    ticket_price: 1000,
    currency: "RSD",
    theme: "smth",
    location: "Kralja Petra 112",
    type: "House",
    description: "",
    phone_number: "",
  },
  {
    id: 2,
    name: "Party 2",
    ticket_price: 0,
    currency: "RSD",
    theme: "smth",
    location: "Tome Živanovića 15",
    type: "Club",
    description: "",
    phone_number: "",
  },
  {
    id: 3,
    name: "Party 3",
    ticket_price: 10,
    currency: "EUR",
    theme: "smth",
    location: "Kralja Petra 23",
    type: "Club",
    description: "",
    phone_number: "",
  },
  {
    id: 4,
    name: "Party 4",
    ticket_price: 1500,
    currency: "RSD",
    theme: "smth",
    location: "Kralja Petra 57",
    type: "Club",
    description: "",
    phone_number: "",
  },
];
function FindAParty() {
  return (
    <div className="h-screen bg-orange-50 text-stone-700 flex flex-col">
      {FakePartyList.map((party) => (
        <FindAPartyListItem
          name={party.name}
          ticket_price={party.ticket_price}
          theme={party.theme}
          currency={party.currency}
          location={party.location}
          type={party.type}
          id={party.id}
          key={party.id}
        />
      ))}
    </div>
  );
}

export default FindAParty;
