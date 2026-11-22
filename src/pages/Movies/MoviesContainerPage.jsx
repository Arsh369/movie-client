import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre((prev) => (prev === genreId ? null : genreId));
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  const activeGenreName = genres?.find((g) => g._id === selectedGenre)?.name;

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Genre Sidebar / Mobile Bar */}
          <aside className="w-full shrink-0 lg:sticky lg:top-8 lg:w-64">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg shadow-black/30">
              <div className="mb-4 flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Genres
                </h2>
                {selectedGenre !== null && (
                  <button
                    type="button"
                    onClick={() => setSelectedGenre(null)}
                    className="text-xs font-semibold text-amber-400 transition hover:text-amber-300"
                  >
                    Reset
                  </button>
                )}
              </div>

              <nav
                aria-label="Movie genres"
                className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0"
              >
                <button
                  type="button"
                  onClick={() => setSelectedGenre(null)}
                  className={`shrink-0 rounded-xl border px-3.5 py-2 text-left text-sm font-medium transition ${
                    selectedGenre === null
                      ? "border-amber-500/40 bg-amber-500/15 font-semibold text-amber-400"
                      : "border-transparent text-slate-300 hover:border-slate-800 hover:bg-slate-950/80 hover:text-white"
                  }`}
                >
                  All Movies
                </button>

                {genres?.map((g) => {
                  const isActive = selectedGenre === g._id;
                  return (
                    <button
                      key={g._id}
                      type="button"
                      onClick={() => handleGenreClick(g._id)}
                      className={`shrink-0 rounded-xl border px-3.5 py-2 text-left text-sm font-medium transition ${
                        isActive
                          ? "border-amber-500/40 bg-amber-500/15 font-semibold text-amber-400"
                          : "border-transparent text-slate-300 hover:border-slate-800 hover:bg-slate-950/80 hover:text-white"
                      }`}
                    >
                      {g.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Movie Sections */}
          <main className="min-w-0 flex-1 space-y-8">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-black/30 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-400">
                    Spotlight
                  </span>
                  <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    Choose For You
                  </h1>
                  <p className="mt-1 text-sm text-slate-400">
                    Handpicked recommendations tailored to your watch vibe
                  </p>
                </div>
              </div>
              <SliderUtil data={randomMovies} />
            </section>

            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-black/30 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Top Movies
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Highest-rated favourites right now
                  </p>
                </div>
              </div>
              <SliderUtil data={topMovies} />
            </section>

            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-black/30 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {activeGenreName ? `${activeGenreName} Movies` : "Choose Movie"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {activeGenreName
                      ? `Showing ${filteredMovies?.length ?? 0} titles in ${activeGenreName}`
                      : "Browse newly added releases across all genres"}
                  </p>
                </div>
              </div>

              {filteredMovies && filteredMovies.length > 0 ? (
                <SliderUtil data={filteredMovies} />
              ) : (
                <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/80 py-10 text-center">
                  <p className="text-sm text-slate-400">
                    No movies found for this genre yet.
                  </p>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MoviesContainerPage;