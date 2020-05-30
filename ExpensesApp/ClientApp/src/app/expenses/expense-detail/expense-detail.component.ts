import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Expense } from '../shared/expense.model';
import { ExpenseService } from '../shared/expense.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit
{
  public expense: Expense;
  public id: string;

  constructor
    (private expenseService: ExpenseService,
     private route: ActivatedRoute) { }

  ngOnInit()
  {
    this.getExpense();
  }

  getExpense()
  {
    var id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.expenseService.getExpense(id)
      .subscribe(result => this.expense = result);
  }
}

interface Comment {
  text: string;
}
