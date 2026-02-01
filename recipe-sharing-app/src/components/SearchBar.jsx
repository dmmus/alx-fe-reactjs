import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search recipes by title, ingredients, or description..."
      onChange={handleSearch}
      style={{
        width: '100%',
        maxWidth: '500px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '2px solid #ddd',
        boxSizing: 'border-box',
        marginBottom: '20px',
        transition: 'border-color 0.3s'
      }}
      onFocus={(e) => e.target.style.borderColor = '#007bff'}
      onBlur={(e) => e.target.style.borderColor = '#ddd'}
    />
  );
};

export default SearchBar;