import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const selectCategoriesState = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState
);
