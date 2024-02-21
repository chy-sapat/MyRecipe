import React from "react";

const CreateRecipe = () => {
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
            <label htmlFor="description">Title</label>
            <input type="text" id="description" />
          </div>
          <div className="ingredients-form"></div>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
