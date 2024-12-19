import React from "react";

const IngredientsList = ({ ingredients, getRecipe, getRecipeData }) => {
  return (
    <div>
      <section>
        <h2>Ingredients on hand:</h2>
        <div className="list-container">
          <ol className="ingredients-list" aria-live="polite">
            {ingredients.length > 0 &&
              ingredients.map((ingredient) => <li>{ingredient}</li>)}
          </ol>
        </div>
        {ingredients.length > 3 && (
          <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe ?</h3>
              <p>Generate recipe from your list of ingredients</p>
            </div>
            <button
              className="get-recipe-button"
              onClick={() => {
                getRecipe(ingredients);
              }}
            >
              Get Recipe
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default IngredientsList;
