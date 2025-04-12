const FakePartyList = [
  {
    name: "Party 1",
    ticket_price: 1000,
    currency: "RSD",
    theme: "smth",
    location: "Kralja Petra 112",
    type: "House",
  },
  {
    name: "Party 2",
    ticket_price: 0,
    currency: "RSD",
    theme: "smth",
    location: "Tome Živanovića 15",
    type: "Club",
  },
  {
    name: "Party 3",
    ticket_price: 10,
    currency: "EUR",
    theme: "smth",
    location: "Kralja Petra 23",
    type: "Club",
  },
  {
    name: "Party 4",
    ticket_price: 1500,
    currency: "RSD",
    theme: "smth",
    location: "Kralja Petra 57",
    type: "Club",
  },
];
function FindAParty() {
  return (
    <div className="h-screen bg-orange-50 text-stone-700">
      {FakePartyList.map((party) => (
        <div key={party.name}>
          <h1>{party.name}</h1>
          <h2>{party.ticket_price + " " + party.currency}</h2>
          <h2>{party.theme}</h2>
          <h2>{party.location}</h2>
          <h2>{party.type}</h2>
          <br />
        </div>
      ))}
    </div>
  );
}

export default FindAParty;
