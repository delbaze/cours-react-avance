export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  createdAt: string;
}

export interface TodosState {
  items: Todo[];
  filter: "all" | "active" | "completed";
  selectedCategory: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export interface ITodoItem {
  todo: Todo;
  onToggle: (id: string) => void;
}
export type FilterType = "all" | "active" | "completed";
