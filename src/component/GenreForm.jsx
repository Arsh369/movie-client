const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="genre-name"
            className="block text-sm font-medium text-slate-300"
          >
            Genre Name
          </label>
          <input
            id="genre-name"
            type="text"
            className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            placeholder="e.g. Sci-Fi, Thriller, Documentary..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-500/25 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 active:scale-[0.99]"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/40 active:scale-[0.99]"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;