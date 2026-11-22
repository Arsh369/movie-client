import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();
  const sp = new URLSearchParams(location.search);
  const redirect =
    sp.get("redirect") || location.state?.from?.pathname || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect, { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Left Column: Sign In Form */}
        <div className="mx-auto w-full max-w-md lg:col-span-5">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
              Welcome Back
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Sign In
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Sign in to rate movies, leave reviews, and manage your watchlist.
            </p>
          </div>

          <form
            onSubmit={submitHandler}
            className="space-y-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-8"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="flex flex-col items-center gap-4 pt-2">
              <button
                disabled={isLoading}
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-500/25 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {isLoading && <Loader size="sm" label="Signing you in..." />}
            </div>

            <div className="border-t border-slate-800/80 pt-5 text-center text-sm text-slate-400">
              New Customer?{" "}
              <Link
                to={
                  redirect !== "/"
                    ? `/register?redirect=${encodeURIComponent(redirect)}`
                    : "/register"
                }
                className="font-semibold text-amber-400 transition hover:text-amber-300 hover:underline"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>

        {/* Right Column: Cinematic Visual Panel */}
        <div className="relative hidden overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900 shadow-2xl shadow-black/60 lg:col-span-7 lg:block lg:h-[42rem]">
          <img
            src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cinema theatre seats"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Curated Cinema
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white">
              Discover top-rated films, new releases, and community reviews.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;