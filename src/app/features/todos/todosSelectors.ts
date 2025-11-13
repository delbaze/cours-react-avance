import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const selectTodosState = (state: RootState) => state.todos;

export const selectTodos = createSelector(
  selectTodosState,
  (todosState) => todosState.items
);
