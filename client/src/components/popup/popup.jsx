import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import "@styles/popup.scss";
import { togglePopUp } from "@features/popUp";

const Popup = () => {
  const popUp = useSelector((state) => state.popUp.value);
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(togglePopUp(""));
  };
  return (
    <div className={`popup ${popUp.enableStatus && "popup-active"}`}>
      {popUp.message}
      <div className="cross-icon" onClick={closePopup}>
        <RxCross1 size={"20px"} />
      </div>
    </div>
  );
};

export default Popup;
