import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import usersReducer from "./features/users/usersSlice";
import postsReducer from "./features/posts/postsSlice";
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
