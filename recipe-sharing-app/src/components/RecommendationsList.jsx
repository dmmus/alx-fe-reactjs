import useRecipeStore from './recipeStore';
import { useEffect } from 'react';
import FavoriteButton from './FavoriteButton';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations, favorites } = useRecipeStore(state => ({
    recommendations: state.recommendations,
    generateRecommendations: state.generateRecommendations,
    favorites: state.favorites
  }));

  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  return (
    <div>
      <h2>Recommendations</h2>
      {recommendations.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <FavoriteButton recipeId={recipe.id} />
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;