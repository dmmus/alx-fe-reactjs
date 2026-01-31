import { useState } from 'react';
import useRecipeStore from '../recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      addRecipe({ id: Date.now(), title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <h2>Add New Recipe</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          rows="6"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            fontFamily: 'Arial, sans-serif'
          }}
          required
        />
      </div>
      <button 
        type="submit"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          width: '100%'
        }}
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;