import React from "react";
import "@styles/adminSetting.scss";
import AdminPasswordChange from "@components/Admin Settings/AdminPasswordChange";

const Setting = () => {
  return (
    <section className="setting-container">
      <h2 className="heading">Setting</h2>
      <section className="setting-group">
        <h3 className="heading-secondary">Admin Login</h3>
        <AdminPasswordChange />
      </section>
    </section>
  );
};

export default Setting;
