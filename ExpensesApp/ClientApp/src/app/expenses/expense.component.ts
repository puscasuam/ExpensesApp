import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Expense } from './shared/expense.model';
import { ExpenseService } from './shared/expense.service';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html'
})

export class ExpenseComponent implements OnInit {
  public expenses: Expense[];
  public expense: Expense;
  public id: string;
  searchType: string;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  getAllExpenses()
  {
    this.expenseService.getAllExpenses()
      .subscribe(expenses => this.expenses = expenses);
  }

  getExpense() {
    var id = this.route.snapshot.paramMap.get('id');

    this.expenseService.getExpense(id)
      .subscribe(result => this.expense = result);
  }

  delete(expenseId: number)
  {
    this.expenseService.delete(expenseId)
      .subscribe(_ => this.getAllExpenses(),
      err => console.log(err),
      () => console.log('expense deleted'));
  }


}

