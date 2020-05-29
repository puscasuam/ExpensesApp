import { PipeTransform, Pipe } from '@angular/core';
import { Expense } from './shared/expense.model';


@Pipe({
  name: 'typeFilter'
})
export class ExpenseFilterPipe implements PipeTransform {
  transform(expenses: Expense[], searchType: string): Expense[] {
    if (!expenses || !searchType) {
      return expenses;
    }

    return expenses.filter(expense => expense.type.toLowerCase().indexOf(searchType.toLowerCase()) !== -1);
  }
}
