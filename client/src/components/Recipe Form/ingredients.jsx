import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";

const IngredientForm = ({ editMode, ingredients, setIngredients }) => {
  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };
  const removeIngredients = (index, e) => {
    e.preventDefault();
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const handleIngredientsChange = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  return (
    <div className="ingredients-form">
      <h3 className="label">Ingredients</h3>
      <section className="ingredients">
        {ingredients.map((ingredient, index) => {
          return (
            <section key={index} className="ingredient">
              <span className="numbering">{index + 1} . </span>
              <textarea
                cols="30"
                rows="1"
                type="text"
                className="recipe-input recipe-normal-input ingredient-input"
                defaultValue={editMode ? ingredients[index] : null}
                onChange={(e) => handleIngredientsChange(e, index)}
              ></textarea>
              <div
                className="remove-icon"
                title="Remove"
                onClick={(e) => removeIngredients(index, e)}
              >
                <RxCross1 size="18px" />
              </div>
            </section>
          );
        })}
        <button
          className="add-ingredients-btn"
          title="Add Ingredients"
          onClick={(e) => addIngredient(e)}
        >
          <IoAddOutline size="20px" />
        </button>
      </section>
    </div>
  );
};

export default IngredientForm;
