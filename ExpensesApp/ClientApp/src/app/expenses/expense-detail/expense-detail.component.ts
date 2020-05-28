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
    //var id = this.route.paramMap.subscribe(params => {
    //  this.id = params.get("id");
    //});
    var id = this.route.snapshot.paramMap.get('id');

    this.expenseService.getExpense(id)
      .subscribe(result => this.expense = result);
  }

}



//export class ExpenseDetailComponent{
//  public expense: Expense;
//  public id: String;

//  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {

//    this.route.paramMap.subscribe(params => {
//      this.id = params.get("id");
//    });

//    console.log('id');
//    console.log(this.id);

//    http.get<Expense>(baseUrl + 'api/Expenses/' + this.id).subscribe(result => {
//      this.expense = result;

//      console.log('expense');
//      console.log(result);
//    }, error => console.error(error));
//  }
//}

//interface Expense {
//  description: string;
//  sum: number;
//  location: string;
//  date: string;
//  currency: string;
//  type: string;
//  comments: [Comment];
//}

interface Comment {
  text: string;
}
