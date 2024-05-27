import React, { useState } from "react";

const AdminPasswordChange = () => {
  const [changeActive, setChangeActive] = useState(false);
  return (
    <>
      <section className="setting-option">
        <label htmlFor="">Change Password</label>
        {!changeActive && (
          <button
            className="btn-green"
            onClick={() => setChangeActive(!changeActive)}
          >
            Change
          </button>
        )}
      </section>
      {changeActive && (
        <section className="setting-input">
          <section className="setting-input-group">
            <label htmlFor="old-password">Old Password</label>
            <input type="password" />
          </section>
          <section className="setting-input-group">
            <label htmlFor="">New Password</label>
            <input type="password" />
          </section>
          <section className="action-btns">
            <button className="btn-green">Change</button>
            <button
              className="btn-red"
              onClick={() => setChangeActive(!changeActive)}
            >
              Cancel
            </button>
          </section>
        </section>
      )}
    </>
  );
};

export default AdminPasswordChange;
