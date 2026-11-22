import { useState } from "react";
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      setDeletingId(reviewId);
      await deleteComment({ movieId, reviewId }).unwrap();
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error(error?.data?.message || "Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  const totalComments =
    movies?.reduce((acc, m) => acc + (m?.reviews?.length ?? 0), 0) ?? 0;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full shrink-0 md:w-64">
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1 p-4">
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-3 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Comments Moderation
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Review audience feedback across movies and remove
                  inappropriate comments.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
                <span>Total Comments</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                  {totalComments}
                </span>
              </div>
            </div>

            {/* Movie Comment Groups */}
            {totalComments > 0 ? (
              <div className="space-y-8">
                {movies?.map((m) => {
                  if (!m?.reviews?.length) return null;

                  return (
                    <section
                      key={m._id}
                      className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6"
                    >
                      <div className="mb-4 flex items-center justify-between border-b border-slate-800/70 pb-3">
                        <h2 className="text-lg font-semibold tracking-tight text-white">
                          {m.name}
                        </h2>
                        <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                          {m.reviews.length}{" "}
                          {m.reviews.length === 1 ? "comment" : "comments"}
                        </span>
                      </div>

                      <div className="space-y-3.5">
                        {m.reviews.map((review) => {
                          const isDeleting = deletingId === review._id;

                          return (
                            <article
                              key={review._id}
                              className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-4 transition-colors duration-150 hover:border-slate-700"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-400">
                                    {review.name?.charAt(0)?.toUpperCase() ||
                                      "U"}
                                  </span>
                                  <strong className="text-sm font-semibold text-slate-100">
                                    {review.name}
                                  </strong>
                                </div>

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

                              <div className="mt-4 flex justify-end border-t border-slate-800/60 pt-3">
                                <button
                                  type="button"
                                  disabled={isDeleting}
                                  onClick={() =>
                                    handleDeleteComment(m._id, review._id)
                                  }
                                  className="inline-flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition-all duration-150 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-14 text-center">
                <p className="text-sm text-slate-400">
                  No comments to moderate yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllComments;
