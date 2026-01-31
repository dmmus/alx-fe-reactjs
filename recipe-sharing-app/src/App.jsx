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
      <div style={{ padding: '20px' }}>
        <h1>Recipe Sharing App</h1>
        <Routes>
          <Route path="/" element={
            <>
              <AddRecipeForm />
              <SearchBar />
              <RecipeList />
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        </Routes>
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