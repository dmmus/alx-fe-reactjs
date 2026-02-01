import './App.css'
// Router configuration with Routes and Route components
import { Routes, Route, useParams, BrowserRouter as Router } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import SearchBar from './components/SearchBar'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import DeleteRecipeButton from './components/DeleteRecipeButton'

function App() {
  return (
    <>
      <div style={{ 
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ 
            textAlign: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '3px solid #4CAF50'
          }}>
            <h1 style={{ margin: '0', color: '#2c3e50', fontSize: '2.5em' }}>🍳 Recipe Sharing App</h1>
            <p style={{ margin: '10px 0 0 0', color: '#666' }}>Discover and share delicious recipes</p>
          </header>
          
          <Routes>
            <Route path="/" element={
              <div>
                <div style={{ 
                  backgroundColor: '#ffffff',
                  padding: '30px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  marginBottom: '30px'
                }}>
                  <h2 style={{ marginTop: '0', color: '#2c3e50' }}>Add a New Recipe</h2>
                  <AddRecipeForm />
                </div>
                
                <div style={{ 
                  backgroundColor: '#ffffff',
                  padding: '30px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <h2 style={{ marginTop: '0', color: '#2c3e50' }}>Search & Browse Recipes</h2>
                  <SearchBar />
                  <RecipeList />
                </div>
              </div>
            } />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

function RecipeDetailsPage() {
  const { id } = useParams();
  const recipeId = Number(id);

  return (
    <div>
      <RecipeDetails recipeId={recipeId} />
      <EditRecipeForm recipeId={recipeId} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  );
}

export default App