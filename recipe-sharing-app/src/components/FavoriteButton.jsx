import React from 'react';
import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const { toggleFavorite, isFavorite } = useRecipeStore(state => ({
    toggleFavorite: state.toggleFavorite,
    isFavorite: state.isFavorite
  }));

  const favorites = useRecipeStore(state => state.favorites);
  const isFav = favorites.includes(recipeId);

  const handleToggleFavorite = () => {
    toggleFavorite(recipeId);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      style={{
        backgroundColor: isFav ? '#ff6b6b' : '#e0e0e0',
        color: isFav ? 'white' : '#666',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = 'none';
      }}
    >
      <span>{isFav ? '❤️' : '🤍'}</span>
      <span>{isFav ? 'Favorited' : 'Add to Favorites'}</span>
    </button>
  );
};

export default FavoriteButton;
