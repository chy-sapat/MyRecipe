import React, { useState, useRef, useEffect } from "react";

import { IoAddOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useGetUserId } from "@hooks/GetUserId";
import { useGetUserDetails } from "@hooks/GetUserDetails";
import "@styles/recipeForm.scss";
import IngredientForm from "./ingredients";
import Steps from "./steps";
import StepForm from "./steps";
import TimePicker from "./TimePicker";

const RecipeForm = ({ buttonLabel, editMode, recipeData, handleSubmit }) => {
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
  const [attachment, setAttachment] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [additionalTips, setAdditionalTips] = useState("");
  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [options, setOptions] = useState({
    addCookingTime: false,
    addDifficulty: false,
    addAdditionalTips: false,
    addPicture: false,
  });
  const userId = useGetUserId();
  const userDetail = useGetUserDetails();
  const recipe = new FormData();

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

  const handleAttachment = (e) => {
    setAttachment(e.target.files[0]);
    setAttachmentUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    recipe.append("userId", userId);
    recipe.append("username", userDetail.username);
    recipe.append("title", recipeTitle.current);
    recipe.append("tags", JSON.stringify(recipeTags));
    recipe.append("description", description);
    recipe.append(
      "ingredients",
      JSON.stringify(ingredients.filter((item) => item != ""))
    );
    recipe.append("steps", JSON.stringify(steps.filter((item) => item != "")));
    recipe.append(
      "cookingTime",
      options.addCookingTime
        ? JSON.stringify(cookingTime)
        : JSON.stringify({ cookingHr: 0, cookingMin: 0 })
    );
    recipe.append("skill", options.addDifficulty ? skill.current : "");
    recipe.append(
      "additionalTips",
      options.addAdditionalTips ? additionalTips : ""
    );
    recipe.append("attachment", options.addPicture ? attachment : "");
    recipe.append(
      "additionalTips",
      options.addAdditionalTips ? additionalTips : ""
    );
    handleSubmit(recipe);
  };
  useEffect(() => {
    const formSetUp = () => {
      const newOptions = { ...options };
      setIngredients(recipeData.ingredients);
      setSteps(recipeData.steps);
      setRecipeTags(recipeData.tags);
      if (
        recipeData.cookingTime.cookingHr ||
        recipeData.cookingTime.cookingMin
      ) {
        setCookingTime(recipeData.cookingTime);
        newOptions.addCookingTime = true;
      }
      if (recipeData.skill) {
        newOptions.addDifficulty = true;
      }
      if (recipeData.additionalTips) {
        setAdditionalTips(recipeData.additionalTips);
        newOptions.addAdditionalTips = true;
      }
      if (recipeData.attachment[0] != "defaultPostImage.jpg") {
        setAttachment(recipeData.attachment[0]);
        setAttachmentUrl(
          `http://localhost:3000/assets/${recipeData.attachment[0]}`
        );
        newOptions.addPicture = true;
      }
      setOptions(newOptions);
    };
    if (editMode) {
      formSetUp();
    }
  }, []);
  return (
    <form className="create-recipe-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        id="title"
        className="recipe-input recipe-title"
        placeholder="Title"
        defaultValue={editMode ? recipeData.title : null}
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
              <div className="cross-icon" onClick={(e) => removeTags(e, index)}>
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
          cols="30"
          rows="4"
          placeholder="Description"
          maxLength="200"
          defaultValue={editMode ? recipeData.description : null}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <span className="description-length">{description.length}/200</span>
      </section>
      <IngredientForm
        editMode={editMode}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <StepForm editMode={editMode} steps={steps} setSteps={setSteps} />
      <h3 className="label">More Options</h3>
      <section className="more-option">
        <section className="option-group">
          <label htmlFor="addCookingTime">
            {!options.addCookingTime ? (
              <span
                className="option-add"
                onClick={() => setOptions({ ...options, addCookingTime: true })}
              >
                Add
              </span>
            ) : (
              <span
                className="option-remove"
                onClick={() =>
                  setOptions({ ...options, addCookingTime: false })
                }
              >
                Remove
              </span>
            )}
            <span>Cooking Time</span>
          </label>
          {options.addCookingTime && (
            <section className="cooking-time-wrapper">
              <TimePicker
                editMode={editMode}
                cTime={cookingTime}
                setCtime={setCookingTime}
              />
            </section>
          )}
        </section>
        <section className="option-group">
          <label htmlFor="addDifficulty">
            {!options.addDifficulty ? (
              <span
                className="option-add"
                onClick={() => setOptions({ ...options, addDifficulty: true })}
              >
                Add
              </span>
            ) : (
              <span
                className="option-remove"
                onClick={() => setOptions({ ...options, addDifficulty: false })}
              >
                Remove
              </span>
            )}
            <span>Difficulty</span>
          </label>
          {options.addDifficulty && (
            <section className="difficulty-wrapper">
              <select onChange={(e) => (skill.current = e.target.value)}>
                <option
                  value="Beginner"
                  selected={editMode && recipeData.skill == "Beginner"}
                >
                  Beginner
                </option>
                <option
                  value="Intermidiate"
                  selected={editMode && recipeData.skill == "Intermidiate"}
                >
                  Intermidiate
                </option>
                <option
                  value="Professional"
                  selected={editMode && recipeData.skill == "Professional"}
                >
                  Professional
                </option>
              </select>
            </section>
          )}
        </section>
        <section className="option-group">
          <label htmlFor="addAdditionalInfo">
            {!options.addAdditionalTips ? (
              <span
                className="option-add"
                onClick={() =>
                  setOptions({ ...options, addAdditionalTips: true })
                }
              >
                Add
              </span>
            ) : (
              <span
                className="option-remove"
                onClick={() =>
                  setOptions({ ...options, addAdditionalTips: false })
                }
              >
                Remove
              </span>
            )}
            <span>Additional Tips</span>
          </label>
          {options.addAdditionalTips && (
            <section className="additional-information-wrapper">
              <textarea
                cols="30"
                rows="2"
                placeholder="Additional Tips(Optional)"
                defaultValue={
                  editMode && recipeData.additionalTips
                    ? recipeData.additionalTips
                    : null
                }
                onChange={(e) => setAdditionalTips(e.target.value)}
              ></textarea>
            </section>
          )}
        </section>
        <section className="option-group">
          <label htmlFor="addPicture">
            {!options.addPicture ? (
              <span
                className="option-add"
                onClick={() => setOptions({ ...options, addPicture: true })}
              >
                Add
              </span>
            ) : (
              <span
                className="option-remove"
                onClick={() => setOptions({ ...options, addPicture: false })}
              >
                Remove
              </span>
            )}
            <span>Picture</span>
          </label>
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
        </section>
      </section>
      <button className="submit-btn" type="submit">
        {buttonLabel}
      </button>
    </form>
  );
};

export default RecipeForm;
