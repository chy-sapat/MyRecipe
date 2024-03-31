import React from "react";

const TopRecipe = () => {
  const [recipeData, setRecipeData] = useState();

  useEffect(() => {}, []);

  return (
    <section className="top-recipe-container">
      <section className="top-all-time">
        <h2>Top of All time</h2>
      </section>
    </section>
  );
};

export default TopRecipe;
