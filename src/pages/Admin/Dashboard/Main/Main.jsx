import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const sumOfCommentsLength =
    allMovies?.reduce((acc, m) => acc + (Number(m.numReviews) || 0), 0) ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8 border-b border-slate-800/80 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Admin Overview
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Track platform growth, top-performing titles, and live activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          {/* Left / Main Analytics Column */}
          <div className="space-y-8 xl:col-span-8">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SecondaryCard
                pill="Users"
                content={visitors?.length ?? 0}
                info="20.2k more than usual"
                gradient="from-amber-500 to-orange-400"
              />
              <SecondaryCard
                pill="Comments"
                content={sumOfCommentsLength}
                info="742.8 more than usual"
                gradient="from-amber-400 to-yellow-300"
              />
              <SecondaryCard
                pill="Movies"
                content={allMovies?.length ?? 0}
                info="372+ more than usual"
                gradient="from-emerald-500 to-teal-400"
              />
            </div>

            {/* Top Content Leaderboard */}
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 shadow-lg shadow-black/30 sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-slate-800/80 pb-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Top Content</span>
                <span>Comments</span>
              </div>

              {topMovies && topMovies.length > 0 ? (
                <div className="space-y-3">
                  {topMovies.map((movie) => (
                    <VideoCard
                      key={movie._id}
                      image={movie.image}
                      title={movie.name}
                      date={movie.year}
                      comments={movie.numReviews}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/50 py-10 text-center">
                  <p className="text-sm text-slate-400">
                    No top content data available yet.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Real-Time Feed */}
          <aside className="xl:col-span-4">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 shadow-lg shadow-black/30 xl:sticky xl:top-8 sm:p-6">
              <RealTimeCard />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Main;