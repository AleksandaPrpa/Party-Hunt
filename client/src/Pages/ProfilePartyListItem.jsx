import { useNavigate } from "react-router-dom";
import { dateFormat } from "../utils/helpers";
function ProfilePartyListItem({ party }) {
  const [year, month, day] = party.party_date.split("-");
  const formattedDate = dateFormat("dd.mm.yyyy", day, month, year);
  const navigate = useNavigate();

  return (
    <div className="p-4 border border-slate-800 rounded-2xl shadow shadow-black/40 bg-slate-900 hover:shadow-md transition flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold text-slate-100">{party.name}</h3>
        <p className="text-sm text-slate-400">
          {party.city} – {formattedDate}
        </p>
      </div>
      <button
        className="bg-cyan-500 text-slate-100 font-semibold py-1.5 px-3 rounded-lg shadow hover:bg-pink-500 transition text-sm cursor-pointer"
        onClick={() => navigate(`/profile/hostedparty/${party._id}`)}
      >
        Show More
      </button>
    </div>
  );
}

export default ProfilePartyListItem;
