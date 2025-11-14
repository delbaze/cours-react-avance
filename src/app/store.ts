import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import usersReducer from "./features/users/usersSlice";
import postsReducer from "./features/posts/postsSlice";
import { apiSlice } from "./features/api/apiSlice";
import { apiRMSlice } from "./features/api/apiRickMorty";
import { favoritesSlice } from "./features/api/favoriteSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    categories: categoriesReducer,
    users: usersReducer,
    posts: postsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiRMSlice.reducerPath]: apiRMSlice.reducer,
    [favoritesSlice.reducerPath]: favoritesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(apiRMSlice.middleware), // cache, refetch, invalidation, polling
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
