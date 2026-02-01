import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

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

  // Favorites operations
  addFavorite: (recipeId) => set(state => {
    if (!state.favorites.includes(recipeId)) {
      return {
        favorites: [...state.favorites, recipeId]
      };
    }
    return state;
  }),

  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  isFavorite: (recipeId) => get().favorites.includes(recipeId),

  toggleFavorite: (recipeId) => set(state => {
    if (state.favorites.includes(recipeId)) {
      return {
        favorites: state.favorites.filter(id => id !== recipeId)
      };
    } else {
      return {
        favorites: [...state.favorites, recipeId]
      };
    }
  }),

  // Recommendations operations
  generateRecommendations: () => set(state => {
    if (state.favorites.length === 0) {
      // If no favorites, recommend random recipes
      return {
        recommendations: state.recipes.sort(() => Math.random() - 0.5).slice(0, 3)
      };
    }

    // Get favorite recipes
    const favoriteRecipes = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id)
    );

    // Generate recommendations based on ingredient similarity
    const recommended = state.recipes
      .filter(recipe => !state.favorites.includes(recipe.id)) // Exclude already favorited
      .map(recipe => {
        let score = 0;

        // Check for shared ingredients
        if (favoriteRecipes.length > 0) {
          const favoriteIngredients = favoriteRecipes.flatMap(fav => fav.ingredients || []);
          const recipeIngredients = recipe.ingredients || [];

          const sharedIngredients = recipeIngredients.filter(ingredient =>
            favoriteIngredients.some(favIng =>
              favIng.toLowerCase().includes(ingredient.toLowerCase()) ||
              ingredient.toLowerCase().includes(favIng.toLowerCase())
            )
          );

          score += sharedIngredients.length * 2;
        }

        // Check description similarity
        favoriteRecipes.forEach(fav => {
          const descriptionWords = (recipe.description || '').toLowerCase().split(/\s+/);
          const favoriteWords = (fav.description || '').toLowerCase().split(/\s+/);
          const commonWords = descriptionWords.filter(word =>
            favoriteWords.includes(word) && word.length > 3
          );
          score += commonWords.length;
        });

        return { recipe, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.recipe);

    return { recommendations: recommended };
  }),

  clearRecommendations: () => set({ recommendations: [] }),

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