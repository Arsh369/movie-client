import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();
  const subscriberCount = visitors?.length ?? 0;

  return (
    <div className="w-full space-y-6 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 text-slate-100 shadow-lg shadow-black/30 sm:p-6">
      {/* Header with Live Indicator */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Realtime
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">Update Live</p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          Live
        </span>
      </div>

      {/* Live Subscriber Metric */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-950/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Subscribe
        </p>
        <p className="mt-1.5 text-3xl font-extrabold tracking-tight text-white">
          {subscriberCount}
        </p>
      </div>

      {/* Nested Milestone Card */}
      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;