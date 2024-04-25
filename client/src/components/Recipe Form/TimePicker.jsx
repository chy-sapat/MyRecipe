import React, { useEffect } from "react";
import "@styles/timepicker.scss";

const TimePicker = ({ editMode, cTime, setCtime }) => {
  return (
    <section className="time-picker-wrapper">
      <section className="time-input">
        <label htmlFor="hours">
          <input
            type="number"
            id="hours"
            defaultValue={editMode ? cTime.cookingHr : "00"}
          />
          <span className="tp-label lbl-hours">Hours</span>
        </label>
        <span>:</span>
        <label htmlFor="min">
          <input
            type="number"
            id="min"
            defaultValue={editMode ? cTime.cookingMin : "00"}
          />
          <span className="tp-label lbl-min">Minutes</span>
        </label>
      </section>
    </section>
  );
};

export default TimePicker;
