import React from "react";

const RecipeStats = () => {
  return (
    <section className="recipe-stats-container">
      <h2 className="heading-secondary">Recipes</h2>
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

export default RecipeStats;
