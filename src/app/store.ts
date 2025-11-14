import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import usersReducer from "./features/users/usersSlice";
import postsReducer from "./features/posts/postsSlice";
import { apiSlice } from "./features/api/apiSlice";
console.log("%c⧭", "color: #d90000", apiSlice.reducerPath);
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer,
    users: usersReducer,
    posts: postsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // cache, refetch, invalidation, polling
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
