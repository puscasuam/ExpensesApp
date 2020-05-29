import { PipeTransform, Pipe } from '@angular/core';
import { Expense } from './shared/expense.model';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'expenseFilter'
})
export class ExpenseFilterPipe implements PipeTransform {
  transform(expenses: Expense[], searchType: string, searchStartDate: string, searchEndDate: string): Expense[] {

    var datePipe = new DatePipe("en-US");
    
    if (searchType) {
      expenses = expenses.filter(expense => expense.type.toLowerCase().indexOf(searchType.toLowerCase()) !== -1);
    }

    if (searchStartDate && searchStartDate.length == 10) {
      searchStartDate = datePipe.transform(searchStartDate, 'y-MM-dd');

      expenses = expenses.filter(expense => {
        var date = datePipe.transform(expense.date, 'y-MM-dd');
        if (date > searchStartDate) {
          return expense;
        }
      });
    }

    if (searchEndDate && searchEndDate.length == 10) {
      searchEndDate = datePipe.transform(searchEndDate, 'y-MM-dd');

      expenses = expenses.filter(expense => {
        var date = datePipe.transform(expense.date, 'y-MM-dd');
        if (date < searchEndDate) {
          return expense;
        }
      });
    }

   

    return expenses;
  }
}
