import React from "react";
import AdminSidebar from "@components/sidebar/adminSidebar";
import "@styles/adminLayout.scss";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  // useEffect(() => {
  //   if (!cookie.admin_token) {
  //     navigate("/admin/login", { replace: true });
  //   }
  // }, []);
  return (
    <section className="admin-layout-container">
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default AdminLayout;
