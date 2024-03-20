import AdminHeader from "../components/AdminHeader";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex vh-100">
      <SideBar />
      <div className="flex-grow-1 d-flex flex-column">
        <AdminHeader />
        <div
          className="flex-column p-3"
          style={{
            overflowX: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
