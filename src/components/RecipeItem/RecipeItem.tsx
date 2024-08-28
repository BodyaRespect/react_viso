import React, { memo } from 'react';
import { Recipe } from '../../types/Recipe';

interface RecipeItemProps {
  recipe: Recipe;
  onAddToFavorites: (recipe: Recipe) => void;
  onRemoveFromFavorites: (recipe: Recipe) => void;
  onToggleSelection: (id: string) => void;
  isSelected: boolean;
}

const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe,
  onAddToFavorites,
  onRemoveFromFavorites,
  onToggleSelection,
  isSelected,
}) => {
  return (
    <div key={recipe.idMeal}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <h2>{recipe.strMeal}</h2>

      <button onClick={() => onAddToFavorites(recipe)}>Add to Favorites</button>
      <button onClick={() => onRemoveFromFavorites(recipe)}>
        Remove from Favorites
      </button>

      <button onClick={() => onToggleSelection(recipe.idMeal)}>
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
};

export default memo(RecipeItem);
