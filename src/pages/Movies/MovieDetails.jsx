import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      setRating(0);
      setComment("");
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.data || error?.message || "Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-500/50 hover:text-amber-400"
          >
            <span>←</span>
            <span>Go Back</span>
          </Link>
        </div>

        {/* Hero Artwork Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900 shadow-2xl shadow-black/50">
          <div className="relative aspect-video w-full overflow-hidden bg-slate-950 sm:max-h-[34rem]">
            {movie?.image ? (
              <img
                src={movie.image}
                alt={movie?.name || "Movie poster"}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full min-h-[16rem] w-full items-center justify-center text-sm text-slate-500">
                Loading artwork...
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"
            />
          </div>
        </div>

        {/* Synopsis & Metadata Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Plot & Title */}
          <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-black/30 lg:col-span-8 sm:p-8">
            <div className="flex flex-wrap items-center gap-2.5">
              {movie?.year && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                  {movie.year}
                </span>
              )}
              {typeof movie?.ratings === "number" && movie.ratings > 0 && (
                <span className="rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-slate-200">
                  ★ {movie.ratings.toFixed(1)}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {movie?.name || "Loading movie..."}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {movie?.detail}
            </p>
          </section>

          {/* Release & Cast Sidebar */}
          <aside className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-black/30 lg:col-span-4 sm:p-7">
            <div className="border-b border-slate-800/80 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Release Year
              </p>
              <p className="mt-1 text-xl font-bold text-white">
                {movie?.year || "—"}
              </p>
            </div>

            <div className="mt-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cast
              </h2>

              {movie?.cast && movie.cast.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <li
                      key={actor?._id || `${actor}-${index}`}
                      className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-slate-200 sm:text-sm"
                    >
                      {typeof actor === "string" ? actor : actor?.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-slate-400">
                  Cast information unavailable.
                </p>
              )}
            </div>
          </aside>
        </div>

        {/* Reviews & Details Tabs */}
        <section className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-lg shadow-black/30 sm:p-8">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </section>
      </div>
    </div>
  );
};

export default MovieDetails;