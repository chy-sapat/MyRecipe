import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import RecipeForm from "@components/Recipe Form/RecipeForm";
import axios from "axios";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const allRecipe = useSelector((state) => state.post.value.allPost);
  const recipeData = allRecipe.filter((recipe) => recipe._id == recipeId);
  const handleUpdate = async (formData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/recipe/update/${recipeId}`,
        formData
      );
      dispatch(togglePopUp(response.data.message));
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
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
