import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one to get started!</p>
      ) : (
        recipes.map(recipe => (
          <div 
            key={recipe.id}
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              margin: '10px 0',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              color: '#333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
            <Link to={`/recipe/${recipe.id}`} style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px', whiteSpace: 'nowrap', marginLeft: '15px' }}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;