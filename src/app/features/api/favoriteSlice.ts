import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiRMSlice } from "./apiRickMorty";

interface FavoritesState {
  ids: number[];
}

const initialState: FavoritesState = {
  ids: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favId) => favId !== id);
      } else {
        state.ids.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.ids));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

// Invalidation manuelle
export const invalidateFavorites = () => (dispatch: any) => {
  dispatch(apiRMSlice.util.invalidateTags([{ type: "Favorite", id: "LIST" }]));
};
