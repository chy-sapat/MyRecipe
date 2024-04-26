import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetAdminId } from "@hooks/useGetAdminId";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const [cookie, _] = useCookies("admin_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookie.admin_token) {
      navigate("/admin/login", { replace: true });
    }
  }, []);
  return <div>AdminDashboard</div>;
};

export default AdminDashboard;
