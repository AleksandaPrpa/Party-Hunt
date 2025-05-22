import { useEffect, useState } from "react";
import FindAPartyListItem from "./FindAPartyListItem";
import Loader from "../UI/Loader";
import { getParties } from "../utils/fetch";

function FindAParty() {
  const [parties, setParties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getParties();
        setParties(data);
      } catch (error) {
        console.error("Error fetching parties:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="relative">
      {isLoading && <Loader />}
      <div className="md:flex-row md:flex-wrap md:justify-between md:px-40 h-auto min-h-screen bg-slate-900 text-slate-100 flex flex-col">
        {parties.map((party, index) => (
          <FindAPartyListItem
            key={party._id}
            id={party._id}
            color_id={index}
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
    </div>
  );
}

export default FindAParty;
