import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { togglePopUp } from "@features/popUp";
import RecipeForm from "@components/Recipe Form/RecipeForm";
import { useGetUserId } from "@hooks/GetUserId";
import { useGetUserDetails } from "@hooks/GetUserDetails";

const CreateRecipe = () => {
  const isSignedIn = useSelector((state) => state.signedIn.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useGetUserId();
  const userDetail = useGetUserDetails();
  const handlePost = async (formData) => {
    formData.append("userId", userId);
    formData.append("username", userDetail.username);
    try {
      const response = await axios.post(
        "http://localhost:3000/recipe/post",
        formData
      );
      dispatch(togglePopUp(response.data.message));
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
    console.log(formData);
  };
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, []);
  return (
    <section className="page-container">
      <h2 className="page-title">Create Recipe</h2>
      <RecipeForm
        buttonLabel="Post"
        editMode={false}
        handleSubmit={handlePost}
      />
    </section>
  );
};

export default CreateRecipe;
