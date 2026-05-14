import Link from "next/link";
import { formatTime, slugify } from "@/lib/utils";

function GameCard({ game, featured }) {
  const year = new Date().getFullYear();
  return (
    <div className={featured ? "mb-8 text-center bg-amber-600 py-2" : "border border-gray-300 text-center shadow-sm rounded-md py-2"}>
      <h2 className={`${featured ? "text-xl text-white" : "text-lg text-blue-700"} font-bold uppercase`}>{game.name}</h2>
      <p className={featured ? "text-white" : "text-red-600 font-semibold"}>({formatTime(game.resultTime)})</p>
      <p className={`${featured ? "text-xl text-white" : "text-xl"} font-bold`}>
        {"{ "}
        {game.first}
        {" } "}
        <span className="text-green-600">➡</span> [ {game.second} ]
      </p>
      <div className="mt-3">
        <Link className={`${featured ? "bg-black text-yellow-200" : "bg-blue-600 text-white"} inline-block text-sm px-4 py-1 w-full transition`} href={`/year-chart/${slugify(game.name)}-result-chart-${year}`}>
          {game.name}
        </Link>
      </div>
    </div>
  );
}

export default function GameCards({ games }) {
  if (!games.length) {
    return <div className="p-4 text-center font-bold text-red-600">No active games found. Import SQL data from admin database backup.</div>;
  }

  const first = games[0];
  const firstGroup = games.slice(1, 7);
  const featuredSecond = games[7];
  const rest = games.slice(8);

  return (
    <div className="bg-white py-8">
      <div className="mb-10">
        {first && <GameCard game={first} featured />}
        <div className="grid grid-cols-2 gap-1">
          {firstGroup.map((game) => <GameCard key={game._id} game={game} />)}
        </div>
      </div>
      <div className="mb-10">
        {featuredSecond && <GameCard game={featuredSecond} featured />}
        <div className="grid grid-cols-2 gap-1">
          {rest.map((game) => <GameCard key={game._id} game={game} />)}
          {first && <GameCard game={first} />}
        </div>
      </div>
    </div>
  );
}
