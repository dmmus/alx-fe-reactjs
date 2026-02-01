import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // Recipe CRUD operations
  addRecipe: (newRecipe) => set(state => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipesList(updatedRecipes, state.searchTerm)
    };
  }),

  setRecipes: (recipes) => set(state => ({
    recipes,
    filteredRecipes: get().filterRecipesList(recipes, state.searchTerm)
  })),

  updateRecipe: (id, updatedRecipe) => set(state => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipesList(updatedRecipes, state.searchTerm)
    };
  }),

  deleteRecipe: (id) => set(state => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipesList(updatedRecipes, state.searchTerm)
    };
  }),

  // Search and filter operations
  setSearchTerm: (term) => set(state => ({
    searchTerm: term,
    filteredRecipes: get().filterRecipesList(state.recipes, term)
  })),

  filterRecipes: () => set(state => ({
    filteredRecipes: get().filterRecipesList(state.recipes, state.searchTerm)
  })),

  // Helper function for filtering recipes
  filterRecipesList: (recipes, searchTerm) => {
    if (!searchTerm.trim()) {
      return recipes;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return recipes.filter(recipe => {
      const titleMatch = recipe.title?.toLowerCase().includes(lowerSearchTerm);
      const ingredientsMatch = recipe.ingredients?.some(ingredient =>
        ingredient.toLowerCase().includes(lowerSearchTerm)
      );
      const descriptionMatch = recipe.description?.toLowerCase().includes(lowerSearchTerm);

      return titleMatch || ingredientsMatch || descriptionMatch;
    });
  }
}));

export default useRecipeStore;