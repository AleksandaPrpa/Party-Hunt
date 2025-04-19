import FindAPartyListItem from "./FindAPartyListItem";
import { FakePartyList } from "../FakePartyList";
function FindAParty() {
  return (
    <div className="md:flex-row md:flex-wrap md:justify-between md:px-40 h-auto min-h-screen bg-orange-50 text-stone-700 flex flex-col">
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
          party_date={party.party_date}
          key={party.id}
        />
      ))}
    </div>
  );
}

export default FindAParty;
