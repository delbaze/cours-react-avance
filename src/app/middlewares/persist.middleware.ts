import type { Middleware } from "@reduxjs/toolkit";

export const STORAGE_KEY = "mon_etat";
export const persistMiddleware: Middleware = (store) => {

  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    console.log("J'ai déjà un state dans localStorage");
  }

  return (next) => (action) => {
    const result = next(action);
    console.log("ACTION....", action);
    const state = store.getState();
    if ((action as any)?.type === "favorites/toggleFavorite") {
      const stateToPersist = {
        favorites: state.favorites,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    }

    return result;
  };
};
