import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Expense } from '../shared/expense.model';
import { Comment } from '../../comments/shared/comment.model';
import { ExpenseService } from '../shared/expense.service';
import { CommentService } from '../../comments/shared/comment.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit
{
  public expense: Expense;
  public comment: Comment;
  public comments: Comment[];
  public id: string;

  constructor(
    private expenseService: ExpenseService,
    private commentService: CommentService,
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

  deleteComment(commentId: number) {
    if (confirm("Are you sure you want to delete the comment?")) {
      this.commentService.delete(commentId)
        .subscribe(_ => this.getExpense(),
          err => console.log(err),
          () => console.log('comment deleted'));
    }
  }

}
