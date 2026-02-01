import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

const Recommendations = () => {
  const { recommendations, generateRecommendations, favorites } = useRecipeStore(state => ({
    recommendations: state.recommendations,
    generateRecommendations: state.generateRecommendations,
    favorites: state.favorites
  }));

  useEffect(() => {
    generateRecommendations();
  }, [favorites]); // Regenerate recommendations when favorites change

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginTop: '30px'
    }}>
      <h2 style={{ marginTop: '0', color: '#2c3e50' }}>
        ✨ Recommended For You
      </h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Based on your favorite recipes, you might also like:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {recommendations.map(recipe => (
          <div
            key={recipe.id}
            style={{
              border: '2px solid #ff6b6b',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff9f9',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.2)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
              {recipe.title}
            </h3>
            <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', minHeight: '40px' }}>
              {recipe.description}
            </p>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '12px', color: '#888' }}>Key Ingredients:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#ffe0e0',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#d32f2f'
                      }}
                    >
                      {ingredient}
                    </span>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <span style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
                      +{recipe.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{
                  flex: 1,
                  padding: '10px 15px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5252'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b6b'}
              >
                View Recipe
              </Link>
              <FavoriteButton recipeId={recipe.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
