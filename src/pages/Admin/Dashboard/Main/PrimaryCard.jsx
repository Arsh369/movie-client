import { useGetUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();
  const userCount = visitors?.length ?? 0;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 p-6 text-slate-100 shadow-lg shadow-black/30">
      {/* Subtle warm ambient accent */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />

      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Milestone
          </span>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Congratulations!
          </h2>
          <p className="text-sm text-slate-300">
            You have{" "}
            <span className="font-semibold text-amber-400">{userCount}</span>{" "}
            {userCount === 1 ? "new user" : "new users"}, watching your content.
          </p>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-xl font-extrabold text-amber-400">
          {userCount}
        </div>
      </div>
    </div>
  );
};

export default PrimaryCard;