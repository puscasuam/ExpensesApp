import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Expense } from '../shared/expense.model';
import { ExpenseService } from '../shared/expense.service';
import { PaginatedExpenses } from '../shared/paginatedExpenses.model';


@Component({
  selector: 'app-expense',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})

export class ExpenseListComponent implements OnInit {
  public displayedColumns: string[] = ['description', 'sum', 'location', 'date', 'currency', 'type', 'noOfComm','action'];

  public expenses: PaginatedExpenses ;
  public expense: Expense;
  public id: string;
  searchType: string;
  searchStartDate: string;
  searchEndDate: string;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses()
      .subscribe(expenses => this.expenses = expenses);
    console.log(this.expenses);

  }

  getExpense() {
    var id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.expenseService.getExpense(id)
      .subscribe(result => this.expense = result);
  }

  delete(expenseId: number) {
    if (confirm("Are you sure you want to delete the expense?")) {
      this.expenseService.delete(expenseId)
        .subscribe(_ => this.getAllExpenses(),
          err => console.log(err),
          () => console.log('expense deleted'));
    }

  }
}

