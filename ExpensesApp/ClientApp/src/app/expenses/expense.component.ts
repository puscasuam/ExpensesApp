import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './shared/expense.model';
import { ExpenseService } from './shared/expense.service';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})

export class ExpenseComponent implements OnInit {
  public expenses: Expense[];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  getAllExpenses()
  {
    this.expenseService.getAllExpenses()
      .subscribe(expenses => this.expenses = expenses);
  }
}

