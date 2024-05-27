import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const StepForm = ({ editMode, instructions, setInstructions }) => {
  const addStep = (e) => {
    e.preventDefault();
    setInstructions([...instructions, ""]);
  };

  const removeStep = (index, e) => {
    e.preventDefault();
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleStepChange = (e, index) => {
    const newInstrucitons = [...instructions];
    newInstrucitons[index] = e.target.value;
    setInstructions(newInstrucitons);
  };
  return (
    <div className="steps-form">
      <h3 className="label">Instructions</h3>
      <section className="steps">
        {instructions.map((instructions, index) => {
          return (
            <section key={index} className="step">
              <span className="numbering">{index + 1} . </span>
              <textarea
                cols="30"
                rows="2"
                className="recipe-input recipe-normal-input step-input"
                defaultValue={editMode ? instructions[index] : null}
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
