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

  //setup for pagination
  collection = { count: 1, data: [] };
  config = {
    id: 'custom',
    itemsPerPage: 2,
    currentPage: 0,
    totalItems: this.collection.count
  };

  //public maxSize: number = 3;
  //public directionLinks: boolean = true;
  //public autoHide: boolean = false;
  //public responsive: boolean = true;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllExpenses(0);
  }

  getAllExpenses(currentPage) {
    this.expenseService.getAllExpenses(currentPage)
      .subscribe(expenses => {
        this.expenses = expenses;

        //this.config.itemsPerPage = this.expenses.itemsPerPage;
        this.config.currentPage = this.expenses.currentPage + 1;
        this.config.totalItems = this.expenses.totalItems;

        this.collection.count = this.expenses.totalItems;
        this.collection.data = this.expenses.items;
      });
  }

  getExpense() {
    var id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.expenseService.getExpense(id)
      .subscribe(result => this.expense = result);
  }

  delete(expenseId: number) {
    if (confirm("Are you sure you want to delete the expense?")) {
      this.expenseService.delete(expenseId)
        .subscribe(_ => this.getAllExpenses(0),
          err => console.log(err),
          () => console.log('expense deleted'));
    }
  }

  onPageChange(event) {
    console.log('on page change');
    console.log(event);

    
    this.getAllExpenses(event - 1);
    //this.config.currentPage = event;
  }
}

