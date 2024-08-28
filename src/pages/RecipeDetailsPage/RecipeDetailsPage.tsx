/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../api/axiosClients';

export const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id),
    enabled: !!id,
    staleTime: 60000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const recipe = data?.meals[0];

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>{recipe.strInstructions}</p>
      <p>Category: {recipe.strCategory}</p>
      <p>Area: {recipe.strArea}</p>
      {recipe.strYoutube && (
        <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
          Watch on YouTube
        </a>
      )}
    </div>
  );
};
