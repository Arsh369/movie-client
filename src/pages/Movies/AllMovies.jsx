import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import MovieCard from "./MovieCard";
import banner from "../../assets/banner.jpeg";
import GoBackButton from "../../component/GoBackButton";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = useMemo(
    () => data?.map((movie) => movie.year) ?? [],
    [data]
  );

  const uniqueYears = useMemo(
    () => Array.from(new Set(movieYears.filter(Boolean))),
    [movieYears]
  );

  useEffect(() => {
    if (!data) return;
    dispatch(setFilteredMovies(data));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, movieYears, uniqueYears, dispatch]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    dispatch(setMoviesFilter({ searchTerm }));

    if (!data) return;
    const nextFiltered = data.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setFilteredMovies(nextFiltered));
  };

  const handleGenreClick = (genreId) => {
    dispatch(setMoviesFilter({ selectedGenre: genreId }));
    if (!data) return;
    if (!genreId) {
      dispatch(setFilteredMovies(data));
      return;
    }
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    dispatch(setMoviesFilter({ selectedYear: year }));
    if (!data) return;
    if (!year) {
      dispatch(setFilteredMovies(data));
      return;
    }
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    dispatch(setMoviesFilter({ selectedSort: sortOption }));
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies || []));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies || []));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies || []));
        break;
      default:
        dispatch(setFilteredMovies(data || []));
        break;
    }
  };

  const handleResetFilters = () => {
    dispatch(
      setMoviesFilter({
        searchTerm: "",
        selectedGenre: "",
        selectedYear: "",
        selectedSort: "",
      })
    );
    dispatch(setFilteredMovies(data || []));
  };

  const hasActiveFilters = Boolean(
    moviesFilter.searchTerm ||
      moviesFilter.selectedGenre ||
      moviesFilter.selectedYear ||
      moviesFilter.selectedSort
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <GoBackButton/>
      {/* Hero Banner */}
      <section className="relative flex px-9 min-h-[26rem] w-full items-center justify-center overflow-hidden border-b border-slate-800/80 sm:min-h-[30rem]">
        <img
          src={banner}
          alt="Movies Hub cinematic banner"
          className="absolute inset-0 h-full w-full object-cover object-top px-9"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/45" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Film Catalog
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            The Movies Hub
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-lg">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>
      </section>

      {/* Search, Filter Bar & Catalog Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <section
          aria-label="Filter movies"
          className="relative z-20 -mt-8 rounded-2xl border border-slate-800/90 bg-slate-900/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-md sm:p-6"
        >
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
              <label htmlFor="movie-search" className="sr-only">
                Search Movie
              </label>
              <input
                id="movie-search"
                type="text"
                placeholder="Search movies by title..."
                value={moviesFilter.searchTerm || ""}
                onChange={handleSearchChange}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 sm:text-base"
              />
            </div>

            {/* Filter Dropdowns & Reset */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
                <select
                  aria-label="Filter by genre"
                  value={moviesFilter.selectedGenre || ""}
                  onChange={(e) => handleGenreClick(e.target.value)}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm font-medium text-slate-200 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="">All Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter by release year"
                  value={moviesFilter.selectedYear || ""}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm font-medium text-slate-200 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="">All Years</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Sort movies"
                  value={moviesFilter.selectedSort || ""}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm font-medium text-slate-200 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-xs font-medium text-slate-400">
                  {filteredMovies?.length ?? 0}{" "}
                  {(filteredMovies?.length ?? 0) === 1 ? "title" : "titles"}
                </span>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/20 hover:text-amber-300"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Movies Grid */}
        <section aria-label="Movies catalog" className="mt-10">
          {filteredMovies && filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-16 text-center">
              <p className="text-base font-medium text-slate-300">
                No movies match your current filters.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Try clearing a filter or searching with another keyword.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AllMovies;