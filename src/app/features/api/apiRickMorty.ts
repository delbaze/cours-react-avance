import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse, Character } from "./types";
import { STORAGE_KEY } from "../../middlewares/persist.middleware";

export const apiRMSlice = createApi({
  reducerPath: "apirm",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api" }),
  tagTypes: ["Favorite"],
  endpoints: (builder) => ({
    //  Pagination pure
    getCharactersPaginated: builder.query<ApiResponse, number>({
      query: (page = 1) => `/character/?page=${page}`,
    }),

    // Recherche + pagination
    searchCharacters: builder.query<
      ApiResponse,
      { name?: string; status?: string; page?: number }
    >({
      query: ({ name, status, page = 1 }) => {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (status) params.append("status", status);
        params.append("page", String(page));
        return `/character/?${params.toString()}`;
      },
    }),

    // Détail
    getCharacter: builder.query<Character, number>({
      query: (id) => `/character/${id}`,
    }),

    // Bonus : Favoris
    getFavorites: builder.query<number[], void>({
      queryFn: () => {
        const favorites = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "{favorites: {ids: []}}"
        );
        // const favorites = JSON.parse(localStorage.getItem("favorites") || "[]") as number[];
        return { data: favorites?.favorites.ids };
      },
      providesTags: (result = []) => [
        ...result.map((id) => ({ type: "Favorite" as const, id })),
        { type: "Favorite", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCharactersPaginatedQuery,
  useSearchCharactersQuery,
  useGetCharacterQuery,
  useGetFavoritesQuery,
} = apiRMSlice;
