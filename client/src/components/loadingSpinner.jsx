import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { ImSpinner3 } from "react-icons/im";
import "../styles/spinner.scss";
const Spinner = ({ size }) => {
  return (
    <>
      <div className="spinner">
        {/* <ImSpinner3 size="30px" /> */}
        <AiOutlineLoading size={size} />
      </div>
    </>
  );
};

export default Spinner;
