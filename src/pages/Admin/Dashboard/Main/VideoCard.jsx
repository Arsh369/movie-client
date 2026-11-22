const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="group flex w-full items-center justify-between gap-4 rounded-xl border border-slate-800/80 bg-slate-950/70 p-3 transition-all duration-200 hover:border-amber-500/40 hover:bg-slate-900/90 sm:p-3.5">
      {/* Thumbnail & Movie Info */}
      <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-900 sm:h-16 sm:w-24">
          <img
            src={image}
            alt={title || "Movie thumbnail"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold tracking-tight text-white transition-colors group-hover:text-amber-400 sm:text-base">
            {title}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-slate-400">{date}</p>
        </div>
      </div>

      {/* Comments Count Pill */}
      <div className="shrink-0">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors group-hover:border-amber-500/30 group-hover:text-amber-300 sm:text-sm">
          <span>{comments ?? 0}</span>
        </span>
      </div>
    </div>
  );
};

export default VideoCard;