const SecondaryCard = ({
  pill,
  content,
  info,
  gradient = "from-amber-500 to-orange-400",
}) => {
  return (
    <div className="group relative flex min-h-[11.5rem] w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 text-slate-100 shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700">
      {/* Subtle top gradient accent bar */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl transition-opacity duration-200 group-hover:opacity-20`}
      />

      {/* Header Pill */}
      <div className="relative flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full bg-gradient-to-r ${gradient} px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-sm`}
        >
          {pill}
        </span>
      </div>

      {/* Primary Stat Value */}
      <div className="relative my-3">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {content ?? 0}
        </h2>
      </div>

      {/* Supporting Trend Info */}
      <p className="relative text-xs font-medium text-slate-400">{info}</p>
    </div>
  );
};

export default SecondaryCard;