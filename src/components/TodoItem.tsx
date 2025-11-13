import type { ITodoItem } from "../app/types";

function TodoItem({ todo, onToggle }: ITodoItem) {
  return (
    <>
      <p key={todo.id}>{todo.text}</p>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
    </>
  );
}

export default TodoItem;
