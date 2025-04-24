import { useParams } from "react-router-dom";
import { FakePartyList } from "../FakePartyList";
import Button from "../UI/Button";
import LinkButton from "../UI/LinkButton";
import AgeLimitBadge from "../UI/AgeLimitBadge";
import { dateFormat, useWindowWidth } from "../utils/helpers";

function FindAPartyShowMore() {
  const { id } = useParams();
  const party = FakePartyList.find((p) => p.id === parseInt(id));
  const [year, month, day] = party.party_date.split("-");
  const width = useWindowWidth();

  return (
    <div className="md:grid md:grid-rows-4 md:grid-cols-2 md:gap-4 md:mt-[-5vh] w-full min-h-screen h-auto flex flex-col md:flex-none items-center p-4 text-2xl bg-orange-50 text-stone-700">
      <div className="md:col-span-2 md:row-start-1 md:mb-0 w-full flex justify-start items-center gap-4 mb-4 px-4">
        <h2 className="text-4xl text-stone-900 font-bold">{party.name}</h2>
        <AgeLimitBadge
          className="flex items-center justify-center w-10 h-10 bg-stone-900 text-white rounded-full text-sm font-semibold"
          age_limit={party.age_limit}
        />
      </div>

      <div className="md:col-start-1 md:row-start-2 md:row-span-4 md:px-10 flex flex-col items-center w-full gap-2">
        <h2 className="text-center">Theme: {party.theme}</h2>
        <h2 className="text-center">Type: {party.type}</h2>
        <h2 className="text-center">
          Party Time: From {party.start_time} until {party.end_time}
        </h2>
        <h2 className="text-center">
          Party Date: {dateFormat("dd.mm.yyyy", day, month, year)}
        </h2>
        <h2 className="text-center">
          Ticket Price: {party.ticket_price} {party.currency}
        </h2>

        {party.type === "Club" ? (
          <>
            <h2 className="text-center">Total Tables: {party.table_count}</h2>
            <h2 className="text-center">
              Remaining tables: {party.table_count - party.tables_reserved}
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-center">Capacity: {party.capacity}</h2>
            <h2 className="text-center">
              Remaining spots: {party.capacity - party.people_signed_up}
            </h2>
          </>
        )}
        {width < 768 ? (
          <>
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
          </>
        ) : (
          <></>
        )}
        <p className="w-full text-left">{party.description}</p>
        <h2 className="text-center">VIP Conditions: {party.vip_conditions}</h2>
        <h2 className="text-center">Phone Number: {party.phone_number}</h2>

        <Button>
          {party.type === "Club" ? `Lock Your Table` : `Secure Your Spot`}
        </Button>
        <LinkButton to={-1}>Show Less</LinkButton>
      </div>

      {width >= 768 && (
        <div className="md:col-start-2 md:row-start-2 md:row-span-5 w-full flex flex-col items-center">
          <h2 className="md:self-start text-center mb-4">
            Location: {party.location + ", " + party.city}
          </h2>
          <div className="w-full h-120 flex justify-center md:items-start md:p-4">
            <iframe
              title={party.location + ", " + party.city}
              className="w-full h-full md:rounded-2xl md:shadow-lg"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                party.location + ", " + party.city
              )}&output=embed`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindAPartyShowMore;
