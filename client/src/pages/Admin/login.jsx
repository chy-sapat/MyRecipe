import React from "react";
import Logo from "@components/logo";
import "@styles/adminlogin.scss";

const AdminLogin = () => {
  return (
    <section className="admin-login-container">
      <Logo />
      <section className="admin-login-wrapper">
        <h2 className="heading">Admin Login</h2>
        <form>
          <section className="form-input-group">
            <label htmlFor="id">Admin Id </label>
            <input type="text" className="form-input" />
          </section>
          <section className="form-input-group">
            <label htmlFor="password">Password </label>
            <input type="password" className="form-input" />
          </section>
          <button className="login-btn">Log In</button>
        </form>
      </section>
    </section>
  );
};

export default AdminLogin;
