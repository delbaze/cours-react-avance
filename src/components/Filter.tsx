import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  filterChanged,
  categoryFilterChanged,
} from "../app/features/todos/todosSlice";
import {
  selectCategoryFilter,
  selectFilter,
  selectTodosByCategory,
} from "../app/features/todos/todosSelectors";
import type { FilterType } from "../app/features/todos/types";

function Filter() {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);
  const selectedCategory = useAppSelector(selectCategoryFilter);
  const categoriesWithCount = useAppSelector(selectTodosByCategory);

  const handleFilterChange = (filter: FilterType) => {
    dispatch(filterChanged(filter));
  };

  const handleCategoryChange = (categoryId: string | null) => {
    dispatch(categoryFilterChanged(categoryId));
  };
  return (
    <div>
      <div>
        <button onClick={() => handleFilterChange("all")}>All</button>
      </div>
      <div>
        <button
          onClick={() => handleFilterChange("active")}
          style={{ color: currentFilter === "active" ? "green" : "blue" }}
        >
          Active
        </button>
      </div>
      <div>
        <button
          onClick={() => handleFilterChange("completed")}
          style={{ color: currentFilter === "completed" ? "green" : "blue" }}
        >
          Completed
        </button>
      </div>

      <div>
        <button onClick={() => handleCategoryChange(null)}>
          All Categories
        </button>

        {categoriesWithCount.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            style={{
              color: selectedCategory === category.id ? "green" : "blue",
            }}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;
