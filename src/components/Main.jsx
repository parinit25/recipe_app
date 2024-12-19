import React, { useState } from "react";
import "./Main.scss";
import { useFormStatus } from "react-dom";
import GenerateRecipe from "./GenerateRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../utils/ai";

const Spinner = () => (
  <div className="spinner">
    <div className="loader"></div>
  </div>
);

function SubmitButton() {
  const { pending, data } = useFormStatus(); // Get the form status
  return (
    <div className="submit-button">
      <button
        type="submit"
        className="add-ingredients-button"
        disabled={pending}
      >
        {pending ? "Adding..." : "Add ingredient"}
      </button>
      {data && (
        <p>
          Adding ingredient: <strong>{data.get("ingredient")}</strong>
        </p>
      )}
    </div>
  );
}

const Main = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const addIngredient = (formData) => {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  const getRecipe = async (ingredients) => {
    setLoading(true); // Start loading
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      console.error("Error fetching recipe:", err);
      setRecipe("Sorry, I couldn't fetch the recipe. Please try again!");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <main>
      <div className="main-container">
        <form action={addIngredient}>
          <input
            type="text"
            aria-label="Add ingredient"
            name="ingredient"
            id="ingredient"
            placeholder="e.g. Oregano"
          />
          <SubmitButton />
        </form>
        {ingredients.length > 0 && (
          <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
        )}
        {loading && <Spinner />} {/* Show spinner when loading */}
        {!loading && recipe && <GenerateRecipe recipe={recipe} />}{" "}
        {/* Show recipe when done */}
      </div>
    </main>
  );
};

export default Main;
