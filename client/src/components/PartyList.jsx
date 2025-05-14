import { useEffect, useState } from "react";

export default function PartyList() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    async function fetchParties() {
      const res = await fetch("http://localhost:5050/party");
      const data = await res.json();
      setParties(data);
    }
    fetchParties();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">All Parties</h1>
      {parties.map((party) => (
        <div key={party._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{party.name}</h2>
          <p>
            <strong>Theme:</strong> {party.theme}
          </p>
          <p>
            <strong>Location:</strong> {party.location}, {party.city}
          </p>
          <p>
            <strong>Type:</strong> {party.type}
          </p>
          <p>
            <strong>Description:</strong> {party.description}
          </p>
          <p>
            <strong>Ticket Price:</strong> {party.ticket_price} {party.currency}
          </p>
          <p>
            <strong>Time:</strong> {party.start_time} - {party.end_time}
          </p>
          <p>
            <strong>Age Limit:</strong> {party.age_limit}+
          </p>
          <p>
            <strong>VIP Conditions:</strong> {party.vip_conditions}
          </p>
          <p>
            <strong>Tables:</strong> {party.table_count}
          </p>
          <p>
            <strong>Capacity:</strong> {party.capacity}
          </p>
          <p>
            <strong>Signed Up:</strong> {party.people_signed_up}
          </p>
          <p>
            <strong>Date:</strong> {party.party_date}
          </p>
          <p>
            <strong>Phone:</strong> {party.phone_number}
          </p>
        </div>
      ))}
    </div>
  );
}
