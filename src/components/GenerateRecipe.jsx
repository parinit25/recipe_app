import React from "react";
import "./GenerateRecipe.scss";
import ReactMarkdown from "react-markdown";

const GenerateRecipe = ({ recipe }) => {
  return (
    <div className="suggested-recipe-container">
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
};

export default GenerateRecipe;
