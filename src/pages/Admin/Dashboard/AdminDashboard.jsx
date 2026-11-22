import GoBackButton from "../../../component/GoBackButton";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full shrink-0 md:w-64">
        <GoBackButton/>
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1 p-4">
        <Main />
      </div>
    </div>
  );
};

export default AdminDashboard;
