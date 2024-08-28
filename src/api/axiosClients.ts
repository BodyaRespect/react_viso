/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { Recipe } from '../types/Recipe';
import { RecipeResponse } from '../types/RecipeResponse';

export const getRecipes = async (
  page: number,
  category: string,
  search: string,
): Promise<Recipe[]> => {
  const categoryQuery = category !== 'all' ? `&c=${category}` : '';
  const searchQuery = search ? `&s=${search}` : '';

  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?page=${page}${categoryQuery}${searchQuery}`,
  );

  return data.meals || [];
};

export const getRecipeById = async (
  id: string | undefined,
): Promise<RecipeResponse> => {
  if (!id) {
    throw new Error('Recipe ID is required');
  }

  const { data } = await axios.get<RecipeResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  return data;
};

export const getRecipeByIds = async (ids: string[]): Promise<Recipe[]> => {
  const responses = await Promise.all(
    ids.map(id =>
      axios.get<RecipeResponse>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php`,
        {
          params: { i: id },
        },
      ),
    ),
  );

  return responses.map(response => response.data.meals[0]);
};

export const getSelectedRecipeIds = async (): Promise<string[]> => {
  const { data } = await axios.get<{ selectedRecipeIds: string[] }>(
    'https://api.example.com/selected-recipes-ids',
  );

  return data.selectedRecipeIds;
};

export const addToSelectedRecipes = async (
  recipeIds: string[],
): Promise<void> => {
  await axios.post('https://api.example.com/selected-recipes', { recipeIds });
};

export const removeFromSelectedRecipes = async (
  recipeIds: string[],
): Promise<void> => {
  await axios.post('https://api.example.com/remove-from-selected-recipes', {
    recipeIds,
  });
};
