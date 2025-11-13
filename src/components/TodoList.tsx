import { selectCategories } from "../app/features/categories/categoriesSelectors";
import {
  selectFilteredTodos,
  selectTodos,
} from "../app/features/todos/todosSelectors";
import { todoToggled } from "../app/features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddTodoForm from "./AddTodoForm";
import Filter from "./Filter";
import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useAppSelector(selectFilteredTodos);
  //   const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  //   dispatch(todoToggled...)
  //   const todos = useAppSelector((state) => state.todos.items);

  const onToggle = (id: string) => {
    dispatch(todoToggled(id));
  };

  return (
    <div>
      <h2>Todos ({todos.length})</h2>
      <AddTodoForm />

      <h2>Liste :</h2>
      <Filter />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default TodoList;
