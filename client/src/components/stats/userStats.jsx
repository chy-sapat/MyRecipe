import React from "react";
import "@styles/userStats.scss";

const UserStats = () => {
  return (
    <section className="user-stats-container">
      <h2 className="heading-secondary">Users</h2>
      <section className="stats-wrapper">
        <section className="stat-count">
          <span className="count">100</span>
          <span className="label">Total</span>
        </section>
        <section className="stat-count">
          <span className="count">100</span>
          <span className="label">Active</span>
        </section>
        <section className="stat-count">
          <span className="count">0</span>
          <span className="label">Suspended</span>
        </section>
        <section className="stat-count">
          <span className="count">0</span>
          <span className="label">Flagged</span>
        </section>
      </section>
    </section>
  );
};

export default UserStats;
