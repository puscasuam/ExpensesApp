import { Expense } from "./expense.model";

export class PaginatedExpenses {

  currentPage : number;
  totalItems: number;
  itemsPerPage : number;
  totalPages : number;
  items: Expense[];
}
