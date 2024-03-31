import React from "react";
import { CgSpinner } from "react-icons/cg";
import "@styles/spinner.scss";

const LoadingSpinner2 = () => {
  return (
    <section className="loading-container">
      <section className="loading-wrapper">
        <div className="loading-icon">
          <CgSpinner size="50px" />
        </div>
      </section>
    </section>
  );
};

export default LoadingSpinner2;
