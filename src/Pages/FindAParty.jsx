import FindAPartyListItem from "./FindAPartyListItem";
const FakePartyList = [
  {
    id: 1,
    name: "Neon Night",
    ticket_price: 1000,
    currency: "RSD",
    theme: "Neon Glow",
    location: "Kralja Petra 112",
    city: "Belgrade",
    type: "House",
    description:
      "Join us for an electrifying Neon Night! Dance under UV lights, enjoy signature glowing cocktails, and feel the house beats all night long. Dress in neon colors for the full effect!",
    phone_number: "+381 64 123 4567",
    start_time: "22:00",
    end_time: "04:00",
    age_limit: 18,
    vip_conditions: "Minimum spend 10,000 RSD.",
    table_count: 0,
    capacity: 150,
    people_signed_up: 120,
  },
  {
    id: 2,
    name: "Retro Club Vibes",
    ticket_price: 0,
    currency: "RSD",
    theme: "80s & 90s Classics",
    location: "Tome Živanovića 15",
    city: "Belgrade",
    type: "Club",
    description:
      "Throwback to the ultimate retro party! Relive the best hits from the 80s and 90s with a funky dance floor, old-school visuals and drinks at nostalgic prices.",
    phone_number: "+381 63 987 6543",
    start_time: "21:00",
    end_time: "03:00",
    age_limit: 21,
    vip_conditions: "Minimum spend 12,000 RSD.",
    table_count: 15,
    capacity: 0,
    people_signed_up: 100,
    tables_reserved: 8,
  },
  {
    id: 3,
    name: "Masquerade Madness",
    ticket_price: 10,
    currency: "EUR",
    theme: "Masquerade Ball",
    location: "Kralja Petra 23",
    city: "Belgrade",
    type: "Club",
    description:
      "A night of elegance and mystery awaits! Bring your best mask and dance the night away surrounded by glamorous guests, deep house sounds and a magical atmosphere.",
    phone_number: "+381 62 321 4321",
    start_time: "23:00",
    end_time: "05:00",
    age_limit: 21,
    vip_conditions: "100 EUR minimum spend.",
    table_count: 12,
    capacity: 0,
    people_signed_up: 80,
    tables_reserved: 5,
  },
  {
    id: 4,
    name: "Backyard Beats",
    ticket_price: 1500,
    currency: "RSD",
    theme: "Chill & Deep House",
    location: "Kralja Petra 57",
    city: "Belgrade",
    type: "House",
    description:
      "Relaxed open-air house party with cozy lighting, live DJs, fire pits and a welcoming vibe. Perfect for summer nights with friends.",
    phone_number: "+381 61 555 6789",
    start_time: "20:00",
    end_time: "02:00",
    age_limit: 18,
    vip_conditions: "Minimum spend 8,000 RSD.",
    table_count: 0,
    capacity: 100,
    people_signed_up: 75,
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
          city={party.city}
          type={party.type}
          id={party.id}
          description={party.description}
          phone_number={party.phone_number}
          start_time={party.start_time}
          end_time={party.end_time}
          age_limit={party.age_limit}
          vip_conditions={party.vip_conditions}
          table_count={party.table_count}
          tables_reserved={party.tables_reserved}
          capacity={party.capacity}
          people_signed_up={party.people_signed_up}
          key={party.id}
        />
      ))}
    </div>
  );
}

export default FindAParty;
