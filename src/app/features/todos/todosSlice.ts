import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterType, Todo, TodosState } from "./types";
import { nanoid } from "@reduxjs/toolkit";

const initialState: TodosState = {
  items: [
    {
      id: "1233",
      category: "projet",
      completed: false,
      text: "Ma tâche",
      createdAt: new Date().toISOString(),
    },
  ],
  filter: "all",
  selectedCategory: null,
  status: "idle",
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // RTK infère automatiquement le type de l'action
    todoAdded: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      },
      prepare: (text: string, category: string) => ({
        payload: {
          id: nanoid(),
          text,
          category,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      }),
    },
    todoToggled: (state, action: PayloadAction<string>) => {
      console.log(action);
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      // AVANT RTK (Grâce à Immer, plus besoin de faire des copies profondes vis à vis des refs d'objets/tableaux)
      // return {
      //   ...state,
      //   items: state.items.map((t) =>
      //     t.id === action.payload ? { ...t, completed: !t.completed } : t
      //   ),
      // };
    },
    filterChanged: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },

    categoryFilterChanged: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    //
  },
});

export const { todoAdded, todoToggled, filterChanged, categoryFilterChanged } =
  todosSlice.actions;
export default todosSlice.reducer;
