import { useParams } from "react-router-dom";
import { FakePartyList } from "../FakePartyList";
import Button from "../UI/Button";
import LinkButton from "../UI/LinkButton";
import AgeLimitBadge from "../UI/AgeLimitBadge";
import { dateFormat } from "../utils/helpers";
function FindAPartyShowMore() {
  const { id } = useParams();
  const party = FakePartyList.find((p) => p.id === parseInt(id));
  const [year, month, day] = party.party_date.split("-");

  return (
    <div className="md:grid w-full min-h-screen h-auto flex flex-col items-center p-4 text-2xl bg-orange-50 text-stone-700">
      <div className="md:w-50 flex items-center justify-between h-20  w-screen px-4">
        <h2 className="text-4xl w-6/8 text-stone-900 font-bold">
          {party.name}
        </h2>
        <AgeLimitBadge
          className="flex items-center justify-center w-12 h-12 bg-stone-900 text-white rounded-full text-md font-semibold"
          age_limit={party.age_limit}
        />
      </div>
      <h2 className="text-center mb-2">Theme: {party.theme}</h2>
      <h2 className="text-center mb-2">Type: {party.type}</h2>
      <h2 className="text-center mb-2">
        Party Time: From {party.start_time} until {party.end_time}
      </h2>
      <h2 className="text-center mb-2">
        Party Date: {dateFormat("dd.mm.yyyy", day, month, year)}
      </h2>
      <h2 className="text-center mb-2">
        Ticket Price: {party.ticket_price} {party.currency}
      </h2>
      {party.type === "Club" ? (
        <>
          <h2 className="text-center mb-2">
            Total Tables: {party.table_count}
          </h2>
          <h2 className="text-center mb-2">
            Remaining tables: {party.table_count - party.tables_reserved}
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-center mb-2">Capacity: {party.capacity}</h2>
          <h2 className="text-center mb-2">
            Remaining spots: {party.capacity - party.people_signed_up}
          </h2>
        </>
      )}
      <h2 className="text-center mb-2">
        Location: {party.location + ", " + party.city}
      </h2>

      <div className="my-5 w-full flex justify-center">
        <iframe
          title={party.location + ", " + party.city}
          width="auto"
          height="auto"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            party.location + ", " + party.city
          )}&output=embed`}
        ></iframe>
      </div>

      <p className="w-full text-left mb-2">{party.description}</p>

      <h2 className="text-center mb-2">
        VIP Conditions: {party.vip_conditions}
      </h2>
      <h2 className="text-center mb-2">Phone Number: {party.phone_number}</h2>

      <Button>
        {party.type === "Club" ? `Lock Your Table` : `Secure Your Spot`}
      </Button>
      {/* TODO: Dodaj funkciju za rezervaciju */}
      <LinkButton to={-1}>Show Less</LinkButton>
    </div>
  );
}

export default FindAPartyShowMore;
