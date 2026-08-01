export default function Clock() {
  const now = new Date();
  const value = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }).format(now);

  return (
    <p className="text-xl sm:text-2xl font-semibold text-pink-600 mb-4 uppercase text-center">
      <time dateTime={now.toISOString()}>{value} IST</time>
    </p>
  );
}
