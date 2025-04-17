function AgeLimitBadge({ age_limit }) {
  if (![16, 18, 21].includes(age_limit)) return null;

  return (
    <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-semibold">
      {age_limit}+
    </span>
  );
}

export default AgeLimitBadge;
