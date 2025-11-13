export interface Category {
  id: string;
  name: string;
  color: string;
}

export type CategoriesState = Category[];

export interface CategoryWithCount extends Category {
  count: number;
}
