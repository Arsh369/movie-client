import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";
import GoBackButton from "../../component/GoBackButton";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      setPassword("");
      setConfirmPassword("");
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const userInitial =
    username?.trim()?.charAt(0)?.toUpperCase() ||
    userInfo?.username?.trim()?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Account Summary Header */}
        <div><GoBackButton/></div>
        <div className="mb-8 flex items-center gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-xl font-extrabold text-amber-400">
            {userInitial}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Update Profile
            </h1>
            <p className="mt-0.5 truncate text-sm text-slate-400">
              Manage your account details and security credentials
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={submitHandler}
          className="space-y-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-8"
        >
          <div>
            <label
              htmlFor="profile-username"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Name
            </label>
            <input
              id="profile-username"
              type="text"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="profile-email"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>
            <input
              id="profile-email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div className="border-t border-slate-800/70 pt-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Change Password (Optional)
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="profile-password"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  New Password
                </label>
                <input
                  id="profile-password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-confirm-password"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Confirm Password
                </label>
                <input
                  id="profile-confirm-password"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-3">
            <button
              type="submit"
              disabled={loadingUpdateProfile}
              className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-500/25 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingUpdateProfile ? "Updating..." : "Update"}
            </button>

            {loadingUpdateProfile && (
              <Loader size="sm" label="Saving profile changes..." />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;