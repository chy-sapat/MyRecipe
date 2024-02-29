import React, { useState } from "react";

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };
  const addStep = (e) => {
    e.preventDefault();
    setSteps([...steps, ""]);
  };
  const removeIngredients = (index, e) => {
    e.preventDefault();
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const removeStep = (index, e) => {
    e.preventDefault();
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };
  return (
    <>
      <div className="create-recipe-form-container">
        <h2 className="title">Create New Recipe</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" />
          </div>

          <div className="ingredients-form">
            <h3>Ingredients</h3>
            <button onClick={(e) => addIngredient(e)}>Add Ingredients</button>
            <section className="ingredients">
              {ingredients.map((ingredient, index) => {
                return (
                  <section key={index} className="ingredient-one">
                    <input type="text" />
                    <button onClick={(e) => removeIngredients(index, e)}>
                      Remove
                    </button>
                  </section>
                );
              })}
            </section>
          </div>
          <div className="steps-form">
            <h3>Steps</h3>
            <button onClick={(e) => addStep(e)}>Add steps</button>
            <section className="steps">
              {steps.map((step, index) => {
                return (
                  <section key={index} className="step-one">
                    <input type="text" />
                    <button onClick={(e) => removeStep(index, e)}>
                      Remove
                    </button>
                  </section>
                );
              })}
            </section>
          </div>
          <div className="attachment-form">
            <div className="picture-preview"></div>
            <input type="file" />
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
