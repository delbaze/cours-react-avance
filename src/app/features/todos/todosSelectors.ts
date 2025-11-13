import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Todo } from "./types";
import type { CategoryWithCount } from "../categories/types";
import { selectCategories } from "../categories/categoriesSelectors";

const selectTodosState = (state: RootState) => state.todos;

// export const selectTodos = createSelector(
//   [selectTodosState],
//   (todoState) => todoState.items
// );

export const selectTodos = createSelector(
  [selectTodosState],
  (todosState) => todosState.items
);

// export const selectFilter = (state: RootState) => state.todos.filter;

// export const selectCategoryFilter = (state: RootState) =>
//   state.todos.selectedCategory;
export const selectFilter = createSelector(
  [selectTodosState],
  (todosState) => todosState.filter
);

export const selectCategoryFilter = createSelector(
  [selectTodosState],
  (todosState) => todosState.selectedCategory
);
// Selector mémoïsé pour les todos filtrés
export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter, selectCategoryFilter],
  (todos, filter, categoryFilter): Todo[] => {
    let filtered = todos;

    // Filtre par statut
    if (filter === "active") {
      filtered = filtered.filter((t) => !t.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((t) => t.completed);
    }

    // Filtre par catégorie
    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    return filtered;
  }
);

// Interface pour catégorie avec count


// Todos par catégorie
export const selectTodosByCategory = createSelector(
  [selectTodos, selectCategories],
  (todos, categories): CategoryWithCount[] => {
    return categories.map((category) => ({
      ...category,
      count: todos.filter((t) => t.category === category.id).length,
    }));
  }
);
