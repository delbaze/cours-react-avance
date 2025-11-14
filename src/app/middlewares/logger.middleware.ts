import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  // curryfiée
  console.log("Dispatching", action);
  const result = next(action);
  console.log("New State", store.getState());
  return result;
};
