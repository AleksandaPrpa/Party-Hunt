function AgeLimitBadge({ age_limit, className }) {
  if (![16, 18, 21].includes(age_limit)) return null;

  return <span className={className}>{age_limit}+</span>;
}

export default AgeLimitBadge;
