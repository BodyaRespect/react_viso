/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecipeByIds, getSelectedRecipeIds } from '../../api/axiosClients';
import { Recipe } from '../../types/Recipe';
import { Ingredient } from '../../types/Ingredient';

export const SelectedRecipesPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: recipeIds = [],
    isLoading: idsLoading,
    error: idsError,
  } = useQuery({
    queryKey: ['selectedRecipeIds'],
    queryFn: getSelectedRecipeIds,
    staleTime: 60000,
  });

  const {
    data: selectedRecipes = [],
    isLoading: recipesLoading,
    error: recipesError,
  } = useQuery({
    queryKey: ['recipesByIds', selectedIds],
    queryFn: () => getRecipeByIds(selectedIds),
    enabled: selectedIds.length > 0,
    staleTime: 60000,
  });

  useEffect(() => {
    if (recipeIds) {
      setSelectedIds(recipeIds);
    }
  }, [recipeIds]);

  const combineIngredients = (recipes: Recipe[]): Ingredient[] => {
    const ingredientsMap: Record<string, number> = {};

    recipes.forEach(recipe => {
      for (let i = 1; i <= 20; i++) {
        const ingredientName = recipe[`strIngredient${i}` as keyof Recipe];
        const measure = recipe[`strMeasure${i}` as keyof Recipe];

        if (ingredientName) {
          const combinedName = `${ingredientName} (${measure || ''})`;

          if (ingredientsMap[combinedName]) {
            ingredientsMap[combinedName]++;
          } else {
            ingredientsMap[combinedName] = 1;
          }
        }
      }
    });

    return Object.entries(ingredientsMap).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  };

  if (idsLoading || recipesLoading) {
    return <div>Loading...</div>;
  }

  if (idsError) {
    return (
      <div>
        Error loading selected recipe IDs: {(idsError as Error).message}
      </div>
    );
  }

  if (recipesError) {
    return (
      <div>
        Error loading selected recipes: {(recipesError as Error).message}
      </div>
    );
  }

  if (selectedRecipes.length === 0) {
    return <div>No recipes selected</div>;
  }

  const combinedIngredients = combineIngredients(selectedRecipes);

  return (
    <div>
      <h2>Selected Recipes</h2>
      {selectedRecipes.map((recipe: Recipe) => (
        <div key={recipe.idMeal}>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>{recipe.strMeal}</h3>
          <p>{recipe.strCategory}</p>
          <p>{recipe.strArea}</p>
          <p>
            <strong>Instructions:</strong> {recipe.strInstructions}
          </p>
        </div>
      ))}

      <h2>Combined Ingredients</h2>
      <ul>
        {combinedIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
