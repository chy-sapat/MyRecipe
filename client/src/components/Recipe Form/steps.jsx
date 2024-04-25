import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const StepForm = ({ editMode, steps, setSteps }) => {
  const addStep = (e) => {
    e.preventDefault();
    setSteps([...steps, ""]);
  };

  const removeStep = (index, e) => {
    e.preventDefault();
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleStepChange = (e, index) => {
    const newSteps = [...steps];
    newSteps[index] = e.target.value;
    setSteps(newSteps);
  };
  return (
    <div className="steps-form">
      <h3 className="label">Instructions</h3>
      <section className="steps">
        {steps.map((step, index) => {
          return (
            <section key={index} className="step">
              <span className="numbering">{index + 1} . </span>
              <textarea
                cols="30"
                rows="2"
                className="recipe-input recipe-normal-input step-input"
                defaultValue={editMode ? steps[index] : null}
                onChange={(e) => handleStepChange(e, index)}
              ></textarea>
              <div
                className="remove-icon"
                title="Remove"
                onClick={(e) => removeStep(index, e)}
              >
                <RxCross1 size="18px" />
              </div>
            </section>
          );
        })}
        <button className="add-steps-btn" onClick={(e) => addStep(e)}>
          <IoAddOutline size="20px" />
        </button>
      </section>
    </div>
  );
};

export default StepForm;
