import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth?.userInfo);

  if (userInfo?.isAdmin) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;