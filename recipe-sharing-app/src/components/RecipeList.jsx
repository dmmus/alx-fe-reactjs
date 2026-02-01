import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const { filteredRecipes, recipes, searchTerm } = useRecipeStore(state => ({
    filteredRecipes: state.filteredRecipes,
    recipes: state.recipes,
    searchTerm: state.searchTerm
  }));

  // Display filtered recipes if search term exists, otherwise display all recipes
  const displayRecipes = searchTerm.trim() ? filteredRecipes : recipes;
  const resultsCount = displayRecipes.length;
  const totalCount = recipes.length;

  return (
    <div style={{ marginTop: '30px', maxWidth: '800px', margin: '30px auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Recipe List</h2>
        {searchTerm.trim() && (
          <p style={{ color: '#666', fontSize: '14px' }}>
            Found <strong>{resultsCount}</strong> recipe{resultsCount !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        )}
      </div>

      {recipes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          color: '#666'
        }}>
          <p>No recipes yet. Add one to get started!</p>
        </div>
      ) : displayRecipes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          backgroundColor: '#fff3cd',
          borderRadius: '5px',
          color: '#856404',
          border: '1px solid #ffeeba'
        }}>
          <p>No recipes match your search "{searchTerm}".</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>Try searching for different ingredients, titles, or descriptions.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid',
          gap: '15px'
        }}>
          {displayRecipes.map(recipe => (
            <div 
              key={recipe.id}
              style={{ 
                border: '1px solid #e0e0e0', 
                padding: '20px', 
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: '#333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>{recipe.title}</h3>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{recipe.description}</p>
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                  <div style={{ marginTop: '10px', fontSize: '13px', color: '#888' }}>
                    <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
                  </div>
                )}
              </div>
              <Link 
                to={`/recipe/${recipe.id}`} 
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#4CAF50', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '4px', 
                  whiteSpace: 'nowrap', 
                  marginLeft: '20px',
                  transition: 'background-color 0.3s',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
      
      {totalCount > 0 && (
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center',
          fontSize: '13px',
          color: '#999'
        }}>
          Showing {resultsCount} of {totalCount} recipe{totalCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default RecipeList;