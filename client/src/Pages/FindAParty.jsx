import { useEffect, useState } from "react";
import FindAPartyListItem from "./FindAPartyListItem";

function FindAParty() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    async function fetchParties() {
      try {
        const response = await fetch("http://localhost:5050/party");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setParties(data);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    }

    fetchParties();
  }, []);

  return (
    <div className="md:flex-row md:flex-wrap md:justify-between md:px-40 h-auto min-h-screen bg-orange-50 text-stone-700 flex flex-col">
      {parties.map((party) => (
        <FindAPartyListItem
          key={party._id}
          id={party._id}
          name={party.name}
          ticket_price={party.ticket_price}
          theme={party.theme}
          currency={party.currency}
          location={party.location}
          city={party.city}
          type={party.type}
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
          party_date={party.party_date}
        />
      ))}
    </div>
  );
}

export default FindAParty;
