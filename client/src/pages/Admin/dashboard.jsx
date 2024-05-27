import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetAdminId } from "@hooks/useGetAdminId";
import { Routes, Route, useNavigate } from "react-router-dom";
import "@styles/adminDashboard.scss";
import AdminSidebar from "@components/sidebar/adminSidebar";
import UserStats from "@components/stats/userStats";
import RecipeStats from "@components/stats/recipeStats";

const AdminDashboard = () => {
  useEffect(() => {}, []);
  return (
    <section className="ad-dashboard-container">
      <h2 className="heading">Dashboard</h2>
      <UserStats />
      <RecipeStats />
    </section>
  );
};

export default AdminDashboard;
