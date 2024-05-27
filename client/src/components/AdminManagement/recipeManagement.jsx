import axios from "axios";
import React, { useEffect, useState } from "react";
import TableDisplay from "./table";

const RecipeManagement = () => {
  const [recipeData, setRecipeData] = useState(null);
  const columndef = [
    { label: "Name", renderCell: (item) => item.title },
    { label: "By", renderCell: (item) => item.username },
  ];
  useEffect(() => {
    const controller = new AbortController();
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/recipes",
          {
            signal: controller.signal,
          }
        );
        setRecipeData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllRecipes();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <section className="management-container">
      <h2 className="heading">Recipe Management</h2>
      {recipeData && <TableDisplay cols={columndef} data={recipeData} />}
    </section>
  );
};

export default RecipeManagement;
