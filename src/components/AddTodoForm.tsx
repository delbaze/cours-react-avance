import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { todoAdded } from "../app/features/todos/todosSlice";
import { selectCategories } from "../app/features/categories/categoriesSelectors";

function AddTodoForm() {
  const dispatch = useAppDispatch();
  // const categories = useAppSelector(....) // todo : la suite
  // const categories = [
  //   { id: "projet", name: "Projet" },
  //   { id: "autre", name: "Autre" },
  // ];
  const categories = useAppSelector(selectCategories);
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0]?.id ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("text", text);
    console.log("category", category);
    if (text.trim() && category) {
      dispatch(todoAdded(text, category));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
