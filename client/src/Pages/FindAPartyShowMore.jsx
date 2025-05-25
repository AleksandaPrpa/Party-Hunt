import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LinkButton from "../UI/LinkButton";
import AgeLimitBadge from "../UI/AgeLimitBadge";
import { dateFormat, useWindowWidth } from "../utils/helpers";
import Loader from "../UI/Loader";
import { getPartyById } from "../utils/fetch";

function FindAPartyShowMore() {
  const { id } = useParams();
  const width = useWindowWidth();
  const [party, setParty] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPartyById(id);
        setParty(data);
      } catch (error) {
        console.error("Error fetching party:", error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!party) return <Loader />;

  const [year, month, day] = party.party_date.split("-");

  return (
    <div className={`w-screen flex ${width >= 768 ? "flex-row" : "flex-col"}`}>
      <div className={`${width >= 768 ? "w-1/2" : "w-screen"}`}>
        <div className="flex flex-row md:justify-start justify-center pt-4 px-4 border-b-2 md:border-b-0 border-cyan-500 pb-2 ">
          <h1 className="text-3xl font-bold flex text-slate-100 md:border-b-2 border-cyan-500 pb-2">
            {party.name}
            <AgeLimitBadge
              className="flex items-center justify-center ml-4 w-10 h-10 bg-cyan-500 text-white rounded-full text-sm font-semibold"
              age_limit={party.age_limit}
            />
          </h1>
        </div>
        <div className="flex px-4 flex-col w-full space-y-3">
          <p>
            <strong className="text-cyan-400">Theme:</strong> {party.theme}
          </p>
          <p>
            <strong className="text-cyan-400">Type:</strong> {party.type}
          </p>
          <p>
            <strong className="text-cyan-400">Party Time:</strong> From{" "}
            {party.start_time} until {party.end_time}
          </p>
          <p>
            <strong className="text-cyan-400">Party Date:</strong>{" "}
            {dateFormat("dd.mm.yyyy", day, month, year)}
          </p>
          <p>
            <strong className="text-cyan-400">Ticket Price:</strong>{" "}
            {party.ticket_price} {party.currency}
          </p>

          {party.type === "Club" ? (
            <>
              <p>
                <strong className="text-cyan-400">Total Tables:</strong>{" "}
                {party.table_count}
              </p>
              <p>
                <strong className="text-cyan-400">Remaining Tables:</strong>{" "}
                {party.table_count - party.tables_reserved}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-cyan-400">Capacity:</strong>{" "}
                {party.capacity}
              </p>
              <p>
                <strong className="text-cyan-400">Remaining Spots:</strong>{" "}
                {party.capacity - party.people_signed_up}
              </p>
            </>
          )}

          {width < 768 && (
            <>
              <p>
                <strong className="text-cyan-400">Location:</strong>{" "}
                {party.location}, {party.city}
              </p>
              <div className="w-full h-60 flex justify-center md:items-start md:p-4">
                <iframe
                  title={party.location + ", " + party.city}
                  className="w-full md:rounded-2xl md:shadow-lg"
                  style={{ border: 0 }}
                  loading={<Loader />}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    party.location + ", " + party.city
                  )}&output=embed`}
                ></iframe>
              </div>
            </>
          )}

          <div className="flex flex-row">
            <strong className="text-cyan-400 block mb-2 text-lg">
              Description:
            </strong>
            <p className="p-1 rounded-lg bg-opacity-20 shadow-inner">
              {party.description}
            </p>
          </div>

          <p>
            <strong className="text-cyan-400">VIP Conditions:</strong>{" "}
            {party.vip_conditions || (
              <span className="italic text-slate-500">None</span>
            )}
          </p>
          <p>
            <strong className="text-cyan-400">Phone Number:</strong>{" "}
            {party.phone_number}
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start">
            <LinkButton
              to={`/findAParty/${party._id}/reservation`}
              isPadding={true}
              className="bg-pink-500 text-slate-100 font-semibold py-3 px-6 rounded-lg shadow hover:bg-pink-600 transition w-full md:w-auto text-center"
            >
              {party.type === "Club" ? `Lock Your Table` : `Secure Your Spot`}
            </LinkButton>
            <LinkButton
              to={-1}
              isPadding={true}
              className="bg-cyan-500 text-slate-900 font-semibold py-3 px-6 rounded-lg shadow hover:bg-cyan-600 transition w-full md:w-auto text-center"
            >
              Show Less
            </LinkButton>
          </div>
        </div>
      </div>
      {width >= 768 && (
        <div className="w-1/2 p-4">
          <p className="text-2xl text-center text-cyan-500 underline underline-offset-8 ">
            <strong className="text-cyan-400">Location: </strong>
            <span className="text-slate-100 ">
              {party.location + ", " + party.city}
            </span>
          </p>
          <div className="w-full h-120 flex justify-center md:items-start md:p-4">
            <iframe
              title={party.location + ", " + party.city}
              className="w-3/4 h-2/3 md:rounded-2xl md:shadow-lg"
              style={{ border: 0 }}
              loading={<Loader />}
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
