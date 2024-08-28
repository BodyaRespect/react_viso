/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getRecipes,
  addToSelectedRecipes,
  removeFromSelectedRecipes,
} from '../../api/axiosClients';
import { Pagination } from '../../components/Pagination';
import { Recipe } from '../../types/Recipe';
import RecipeItem from '../../components/RecipeItem/RecipeItem';

export const AllRecipesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recipes', currentPage, selectedCategory, searchTerm],
    queryFn: () => getRecipes(currentPage, selectedCategory, searchTerm),
    staleTime: 60000,
  });

  const addMutation = useMutation({
    mutationFn: (recipeIds: string[]) => addToSelectedRecipes(recipeIds),
    onSuccess: () => {},
  });

  const removeMutation = useMutation({
    mutationFn: (recipeIds: string[]) => removeFromSelectedRecipes(recipeIds),
    onSuccess: () => {},
  });

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value);
      setCurrentPage(1);
    },
    [],
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleAddToFavorites = useCallback(
    (recipe: Recipe) => {
      addMutation.mutate([recipe.idMeal]);
    },
    [addMutation],
  );

  const handleRemoveFromFavorites = useCallback(
    (recipe: Recipe) => {
      removeMutation.mutate([recipe.idMeal]);
    },
    [removeMutation],
  );

  const toggleRecipeSelection = useCallback((id: string) => {
    setSelectedIds(prevIds =>
      prevIds.includes(id) ? prevIds.filter(i => i !== id) : [...prevIds, id],
    );
  }, []);

  const handleAddSelected = useCallback(() => {
    addMutation.mutate(selectedIds);
    setSelectedIds([]);
  }, [addMutation, selectedIds]);

  const handleRemoveSelected = useCallback(() => {
    removeMutation.mutate(selectedIds);
    setSelectedIds([]);
  }, [removeMutation, selectedIds]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (recipes.length === 0) {
    return <div>No recipes found</div>;
  }

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All Categories</option>
        <option value="Beef">Beef</option>
        <option value="Chicken">Chicken</option>
        <option value="Dessert">Dessert</option>
      </select>

      <input
        type="text"
        placeholder="Search recipes"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {recipes.map((recipe: Recipe) => (
        <RecipeItem
          key={recipe.idMeal}
          recipe={recipe}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
          onToggleSelection={toggleRecipeSelection}
          isSelected={selectedIds.includes(recipe.idMeal)}
        />
      ))}

      <Pagination
        totalPages={10} // Adjust based on actual pagination data
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <button onClick={handleAddSelected} disabled={selectedIds.length === 0}>
        Add Selected to Favorites
      </button>

      <button
        onClick={handleRemoveSelected}
        disabled={selectedIds.length === 0}
      >
        Remove Selected from Favorites
      </button>
    </div>
  );
};
