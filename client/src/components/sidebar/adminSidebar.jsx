import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "@components/logo";
import "@styles/adminSidebar.scss";

const AdminSidebar = () => {
  return (
    <section className="sidebar-container">
      <Logo />
      <h2 className="heading">Admin</h2>
      <ul className="nav-links">
        <li>
          <NavLink to="" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="user-management" className="nav-link">
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink to="recipe-management" className="nav-link">
            Recipe Management
          </NavLink>
        </li>
        <li>
          <NavLink to="pro-recipe" className="nav-link">
            Pro Recipe
          </NavLink>
        </li>
        <li>
          <NavLink to="setting" className="nav-link">
            Setting
          </NavLink>
        </li>
        <li>Log Out</li>
      </ul>
    </section>
  );
};

export default AdminSidebar;
