import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="space-y-8">
      {/* Write Review Form / Sign-In Prompt */}
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler} className="max-w-2xl space-y-4">
            <div>
              <label
                htmlFor="comment"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Write Your Review
              </label>

              <textarea
                id="comment"
                rows="4"
                required
                placeholder="Share your thoughts on the plot, performances, or direction..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl border border-amber-500/40 bg-amber-500/15 px-5 py-2.5 text-sm font-semibold text-amber-400 transition hover:border-amber-500/60 hover:bg-amber-500/25 hover:text-amber-300"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 px-4 py-3.5 text-sm text-slate-300">
            Please{" "}
            <Link
              to="/login"
              className="font-semibold text-amber-400 underline-offset-4 transition hover:text-amber-300 hover:underline"
            >
              Sign In
            </Link>{" "}
            to write a review.
          </div>
        )}
      </section>

      {/* Reviews List */}
      <section className="border-t border-slate-800/80 pt-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Reviews
          </h2>
          <span className="rounded-full border border-slate-800 bg-slate-950/80 px-3 py-0.5 text-xs font-semibold text-slate-300">
            {movie?.reviews?.length ?? 0}
          </span>
        </div>

        {!movie?.reviews || movie.reviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/80 py-8 text-center">
            <p className="text-sm text-slate-400">No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {movie.reviews.map((review) => (
              <article
                key={review._id}
                className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <strong className="text-sm font-semibold text-slate-100">
                    {review.name}
                  </strong>
                  <time
                    dateTime={review.createdAt}
                    className="text-xs font-medium text-slate-400"
                  >
                    {review.createdAt?.substring(0, 10)}
                  </time>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;