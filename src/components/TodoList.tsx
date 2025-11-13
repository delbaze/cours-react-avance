import { selectTodos } from "../app/features/todos/todosSelectors";
import { todoToggled } from "../app/features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useAppSelector(selectTodos);
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
      {todos.map((todo) => (
        <TodoItem todo={todo} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default TodoList;
