import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoAddOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import "@styles/createRecipe.scss";
import { useGetUserId } from "@hooks/GetUserId";
import { togglePopUp } from "@features/popUp";
import { useGetUserDetails } from "@hooks/GetUserDetails";

const CreateRecipe = () => {
  const recipeTitle = useRef("");
  const [recipeTags, setRecipeTags] = useState([]);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState(["", ""]);
  const [steps, setSteps] = useState(["", ""]);
  const [cookingTime, setCookingTime] = useState({
    cookingHr: 0,
    cookingMin: 0,
  });
  const skill = useRef("");
  const [serving, setServing] = useState(0);
  const [attachment, setAttachment] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [additionalTips, setAdditionalTips] = useState("");
  const [options, setOptions] = useState({
    addCookingTime: false,
    addDifficulty: false,
    addServing: false,
    addAdditionalTips: false,
    addPicture: false,
  });
  const isSignedIn = useSelector((state) => state.signedIn.value);
  const popUp = useSelector((state) => state.popUp.value);
  const userId = useGetUserId();
  const userDetail = useGetUserDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTags = (e) => {
    const tagInput = e.target.value;
    if (tagInput[tagInput.length - 1] == " ") {
      const tag = tagInput.trim();
      setRecipeTags([...recipeTags, tag]);
      e.target.value = "";
    }
  };

  const removeTags = (e, index) => {
    e.preventDefault();
    const newTags = [...recipeTags];
    newTags.splice(index, 1);
    setRecipeTags(newTags);
  };

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

  const handleIngredientsChange = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (e, index) => {
    const newSteps = [...steps];
    newSteps[index] = e.target.value;
    setSteps(newSteps);
  };

  const increaseTime = (e, action) => {
    e.preventDefault();
    if (action == "hr") {
      setCookingTime({ ...cookingTime, cookingHr: cookingTime.cookingHr + 1 });
    } else {
      if (cookingTime.cookingMin == 59) {
        setCookingTime({
          ...cookingTime,
          cookingHr: cookingTime.cookingHr + 1,
          cookingMin: 0,
        });
      } else {
        setCookingTime({
          ...cookingTime,
          cookingMin: cookingTime.cookingMin + 1,
        });
      }
    }
  };

  const decreaseTime = (e, action) => {
    e.preventDefault();
    if (action == "hr" && cookingTime.cookingHr > 0) {
      setCookingTime({ ...cookingTime, cookingHr: cookingTime.cookingHr - 1 });
    } else if (action == "min") {
      if (cookingTime.cookingHr > 0 && cookingTime.cookingMin == 0) {
        setCookingTime({
          ...cookingTime,
          cookingHr: cookingTime.cookingHr - 1,
          cookingMin: 59,
        });
      } else if (cookingTime.cookingMin > 0) {
        setCookingTime({
          ...cookingTime,
          cookingMin: cookingTime.cookingMin - 1,
        });
      }
    }
  };

  const changeServing = (action) => {
    if (action == "increase") {
      setServing(serving + 1);
    } else {
      serving > 1 && setServing(serving - 1);
    }
  };

  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
    setAttachmentUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const recipe = new FormData();
    recipe.append("userId", userId);
    recipe.append("username", userDetail.username);
    recipe.append("title", recipeTitle.current);
    recipe.append("tags", JSON.stringify(recipeTags));
    recipe.append("description", description);
    recipe.append("ingredients", JSON.stringify(ingredients));
    recipe.append("steps", JSON.stringify(steps));
    recipe.append(
      "cookingTime",
      options.addCookingTime
        ? JSON.stringify(cookingTime)
        : JSON.stringify({ cookingHr: 0, cookingMin: 0 })
    );
    recipe.append("skill", options.addDifficulty ? skill.current : "");
    recipe.append("serving", options.serving ? serving : 0);
    recipe.append("attachment", options.addPicture ? attachment : "");
    recipe.append(
      "additionalTips",
      options.addAdditionalTips ? additionalTips : ""
    );
    try {
      const response = await axios.post(
        "http://localhost:3000/recipe/post",
        recipe
      );
      dispatch(togglePopUp(response.data.message));
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="create-recipe-form-container">
        <h2 className="title">Create New Recipe</h2>
        <form className="create-recipe-form" onSubmit={(e) => handlePost(e)}>
          <input
            type="text"
            id="title"
            className="recipe-input recipe-title"
            placeholder="Title"
            onChange={(e) => (recipeTitle.current = e.target.value)}
            required
          />
          <input
            type="text"
            id="tags"
            className="recipe-input recipe-normal-input"
            placeholder="Tags"
            onChange={(e) => handleTags(e)}
          />
          <section className="tags-display">
            {recipeTags.map((tag, index) => {
              return (
                <div className="recipe-tags" key={index}>
                  <span>{tag}</span>
                  <div
                    className="cross-icon"
                    onClick={(e) => removeTags(e, index)}
                  >
                    <RxCross1 />
                  </div>
                </div>
              );
            })}
          </section>
          <section className="description-field-wrapper">
            <textarea
              name="des"
              className="description-field"
              // className="recipe-input recipe-normal-input"
              cols="30"
              rows="4"
              placeholder="Description"
              maxLength="200"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span className="description-length">{description.length}/200</span>
          </section>
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
                      onChange={(e) => handleIngredientsChange(e, index)}
                    ></textarea>
                    <div
                      className="remove-icon"
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
          <div className="steps-form">
            <h3 className="label">Directions</h3>
            <section className="steps">
              {steps.map((step, index) => {
                return (
                  <section key={index} className="step">
                    <span className="numbering">{index + 1} . </span>
                    <textarea
                      cols="30"
                      rows="1"
                      className="recipe-input recipe-normal-input step-input"
                      onChange={(e) => handleStepChange(e, index)}
                    ></textarea>
                    <div
                      className="remove-icon"
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
          <h3 className="label">More Options</h3>
          <section className="more-option">
            <section className="option-group">
              <input
                type="checkbox"
                id="addCookingTime"
                onChange={() =>
                  setOptions({
                    ...options,
                    addCookingTime: !options.addCookingTime,
                  })
                }
              />
              <label htmlFor="addCookingTime">Cooking Time</label>
            </section>
            <section className="option-group">
              <input
                type="checkbox"
                id="addDifficulty"
                onChange={() =>
                  setOptions({
                    ...options,
                    addDifficulty: !options.addDifficulty,
                  })
                }
              />
              <label htmlFor="addDifficulty">Difficulty</label>
            </section>
            <section className="option-group">
              <input
                type="checkbox"
                id="addServing"
                onChange={() =>
                  setOptions({
                    ...options,
                    addServing: !options.addServing,
                  })
                }
              />
              <label htmlFor="addServing">Serving</label>
            </section>
            <section className="option-group">
              <input
                type="checkbox"
                id="addAdditionalInfo"
                onChange={() =>
                  setOptions({
                    ...options,
                    addAdditionalTips: !options.addAdditionalTips,
                  })
                }
              />
              <label htmlFor="addAdditionalInfo">Additional Tips</label>
            </section>
            <section className="option-group">
              <input
                type="checkbox"
                id="addPicture"
                onChange={() =>
                  setOptions({
                    ...options,
                    addPicture: !options.addPicture,
                  })
                }
              />
              <label htmlFor="addPicture">Picture</label>
            </section>
          </section>
          <section className="time-difficulty-serving-wrapper">
            {options.addCookingTime && (
              <section className="cooking-time-wrapper">
                <label>Cooking Time</label>
                <section className="hour-time">
                  <button
                    className="up-btn"
                    onClick={(e) => increaseTime(e, "hr")}
                  >
                    +
                  </button>
                  <input
                    className="cooking-time"
                    type="number"
                    min="0"
                    length="3"
                    value={cookingTime.cookingHr}
                    onChange={(e) =>
                      setCookingTime({
                        ...cookingTime,
                        cookingHr: e.target.value,
                      })
                    }
                  />
                  <button
                    className="down-btn"
                    onClick={(e) => decreaseTime(e, "hr")}
                  >
                    -
                  </button>
                </section>
                <span>Hr</span>
                <section className="min-time">
                  <button
                    className="up-btn"
                    onClick={(e) => increaseTime(e, "min")}
                  >
                    +
                  </button>
                  <input
                    className="cooking-time"
                    type="number"
                    min="0"
                    minLength={2}
                    maxLength={2}
                    max={59}
                    value={cookingTime.cookingMin}
                    onChange={(e) =>
                      setCookingTime({
                        ...cookingTime,
                        cookingMin: e.target.value,
                      })
                    }
                  />
                  <button
                    className="down-btn"
                    onClick={(e) => decreaseTime(e, "min")}
                  >
                    -
                  </button>
                </section>
                <span>Min</span>
              </section>
            )}
            {options.addDifficulty && (
              <section className="difficulty-wrapper">
                <label htmlFor="difficulty">Difficulty</label>
                <select onChange={(e) => (skill.current = e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermidiate">Intermidiate</option>
                  <option value="Professional">Professional</option>
                </select>
              </section>
            )}
            {options.addServing && (
              <section className="serving-wrapper">
                <label htmlFor="serving">Servings</label>

                <div
                  className="decrease-btn"
                  onClick={() => changeServing("decrease")}
                >
                  -
                </div>
                {serving}
                <div
                  className="increase-btn"
                  onClick={() => changeServing("increase")}
                >
                  +
                </div>
              </section>
            )}
          </section>
          {options.addAdditionalTips && (
            <section className="additional-information-wrapper">
              <textarea
                cols="30"
                rows="2"
                placeholder="Additional Tips(Optional)"
                onChange={(e) => setAdditionalTips(e.target.value)}
              ></textarea>
            </section>
          )}
          {options.addPicture && (
            <div className="attachment-form">
              <div className="picture-preview">
                {attachment ? (
                  <img src={attachmentUrl} />
                ) : (
                  <span>Add Picture</span>
                )}
              </div>
              <input
                className="attachment-file"
                type="file"
                accept="image/*"
                onChange={(e) => handleAttachment(e)}
              />
            </div>
          )}
          <button className="submit-btn" type="submit">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
