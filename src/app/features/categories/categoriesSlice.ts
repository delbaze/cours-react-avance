import { createSlice } from "@reduxjs/toolkit";
import type {  CategoriesState } from "./types";

const initialState: CategoriesState = [
  { id: "projet", name: "Projet", color: "blue" },
  { id: "autre", name: "Autre", color: "green" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
