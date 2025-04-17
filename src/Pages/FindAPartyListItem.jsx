import { useState } from "react";
import Button from "../Components/UI/Button";
import AgeLimitBadge from "../Components/UI/AgeLimitBadge";

function FindAPartyListItem({
  name,
  ticket_price,
  currency,
  theme,
  location,
  city,
  type,
  description,
  phone_number,
  id,
  start_time,
  end_time,
  age_limit,
  vip_conditions,
  table_count,
  tables_reserved,
  capacity,
  people_signed_up,
}) {
  const [showMore, setShowMore] = useState(false);
  const remainingTables = table_count - tables_reserved;
  const remainingSpots = capacity - people_signed_up;
  function setColor(i) {
    if (i % 2) return "bg-orange-50";
    else return "bg-orange-100";
  }
  function showCapacity(type) {
    if (type === "House") return `Remaining spots: ${remainingSpots}`;
    else return `Remaining tables: ${remainingTables}`;
  }
  function buttonTextForReservation(type) {
    if (type === "House") return `Secure Your Spot`;
    else return `Lock Your Table`;
  }
  return (
    <div
      className={`w-screen h-auto p-4 text-2xl text-stone-700 ${setColor(
        id
      )} grid grid-rows-[auto_auto_auto_auto] grid-cols-1 gap-y-2`}
    >
      <div className="flex justify-between items-center">
        <h1 className="self-start">{name}</h1>
        <AgeLimitBadge age_limit={age_limit} />
      </div>

      <h2 className="justify-self-center">{`Cena: ${
        ticket_price + " " + currency
      }`}</h2>
      <h2 className="justify-self-center">{showCapacity(type)}</h2>
      {showMore ? (
        <>
          <h2 className="justify-self-center">Theme: {theme}</h2>
          <h2 className="justify-self-center">Type: {type}</h2>
          <h2 className="justify-self-start">
            Party Time: From {start_time} until {end_time}
          </h2>
          <h2 className="justify-self-center">{location + ", " + city}</h2>
          <div className="my-4 flex justify-center">
            <iframe
              title={location + ", " + city}
              width="auto"
              height="auto"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                location + ", " + city
              )}&output=embed`}
            ></iframe>
          </div>
          <p className="justify-self-start">{description}</p>
          <h2>Vip conditions: {vip_conditions}</h2>
          <h2 className="justify-self-start">Phone number: {phone_number}</h2>
          <Button>{buttonTextForReservation()}</Button>
          {/*TODO: Dodaj dunkciju za reservaciju*/}
        </>
      ) : (
        <>
          <h2 className="justify-self-center">{location + ", " + city}</h2>
        </>
      )}
      <Button onClick={() => setShowMore(!showMore)}>
        {showMore ? "SHOW LESS" : "SHOW MORE"}
      </Button>
    </div>
  );
}

export default FindAPartyListItem;
