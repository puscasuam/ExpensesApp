import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent{
  public expense: Expense;
  public id: String;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
    });

    console.log('id');
    console.log(this.id);

    http.get<Expense>(baseUrl + 'api/Expenses/' + this.id).subscribe(result => {
      this.expense = result;

      console.log('expense');
      console.log(result);
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
  comments: [Comment];
}

interface Comment {
  text: string;
}
