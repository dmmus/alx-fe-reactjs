import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeId = parseInt(id);
    const foundRecipe = recipeData.find((r) => r.id === recipeId);
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{recipe.title}</h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="mb-2">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700">
              {recipe.instructions && recipe.instructions.map((step, index) => (
                <li key={index} className="mb-2">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;