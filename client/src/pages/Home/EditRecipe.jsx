import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import RecipeForm from "@components/Recipe Form/RecipeForm";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const allRecipe = useSelector((state) => state.post.value.allPost);
  const recipeData = allRecipe.filter((recipe) => recipe._id == recipeId);
  const handleUpdate = (formData) => {
    console.log(formData);
  };
  return (
    <section className="page-container">
      <h2 className="page-title">Edit Recipe</h2>
      <RecipeForm
        buttonLabel="Update"
        editMode={true}
        recipeData={recipeData[0]}
        handleSubmit={handleUpdate}
      />
    </section>
  );
};

export default EditRecipe;
