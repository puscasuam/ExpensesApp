import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})
export class ExpenseComponent {
  public expenses: Expense[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Expense[]>(baseUrl + 'api/Expenses').subscribe(result => {
      this.expenses = result;
    }, error => console.error(error));
  }
}

interface Expense {
  description: string;
  sum: number;
  location: string;
  date: string;
  currency: string;
  type: string;
  commentsNumber: number;
}
