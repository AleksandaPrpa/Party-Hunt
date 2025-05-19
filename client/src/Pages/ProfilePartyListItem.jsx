import { dateFormat } from "../utils/helpers";
function ProfilePartyListItem({ party }) {
  const [year, month, day] = party.party_date.split("-");
  const formattedDate = dateFormat("dd.mm.yyyy", day, month, year);

  return (
    <div className="p-4 border rounded-2xl shadow bg-white hover:shadow-md transition flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold text-stone-800">{party.name}</h3>
        <p className="text-sm text-stone-600">
          {party.city} – {formattedDate}
        </p>
      </div>
      <button
        className="bg-amber-300 text-stone-800 font-semibold py-1.5 px-3 rounded-lg shadow hover:bg-amber-400 transition text-sm cursor-pointer"
        onClick={() => console.log("Show more for:", party._id)}
      >
        Show More
      </button>
    </div>
  );
}

export default ProfilePartyListItem;
