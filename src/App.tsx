/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AllRecipesPage } from './pages/AllRecipesPage';
import { SelectedRecipesPage } from './pages/SelectedRecipesPage';
import { RecipeDetailsPage } from './pages/RecipeDetailsPage'; // Ensure this page exists

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllRecipesPage />} />
        <Route path="/selected-recipes" element={<SelectedRecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
      </Routes>
    </Router>
  );
};
