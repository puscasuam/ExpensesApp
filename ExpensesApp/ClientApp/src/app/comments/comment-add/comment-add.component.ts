import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { ImportantType } from '../shared/enums/importantTypes.enum';
import { CommentService } from '../shared/comment.service';
import { Comment } from '../shared/comment.model';


@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})

export class CommentAddComponent implements OnInit {
  private commentForm: FormGroup;
  public importantTypes = Object.values(ImportantType);
  public comment: Comment;


  constructor(
    private commentService: CommentService,
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.addCommentForm();
    this.getComment();
  }

  addCommentForm() {
    this.commentForm = this.fb.group({
      text: ['', Validators.required],
      important: [0]
    });
  }

  getComment() {
    var commentId = parseInt(this.route.snapshot.paramMap.get('cid'));

    if (commentId !== 0) {
      this.commentService.getComment(commentId)
        .subscribe(result => {
          this.comment = result;

          if (this.comment !== null) {
            this.commentForm.setValue({
              text: this.comment.text,
              important: this.comment.important
            });
          }
        });
    }
  }


  onSubmit({ value, valid }) {

    console.log("in submit comment");
    console.log(value);
    console.log(valid);

    if (valid) {
      var expenseId = parseInt(this.route.snapshot.paramMap.get('eid'));
      var commentId = parseInt(this.route.snapshot.paramMap.get('cid'));

      console.log("in submit");
      console.log(commentId);

      if (commentId === 0) {

        value.expenseId = expenseId;
        value.important = value.important == 'true' ? true : false;
        console.log("in if");
        console.log(value);

        this.commentService.add(value)
          .subscribe(
            _ => this.location.back(),
            err => {
              const validationErrors = err.error.errors;

              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.commentForm.get(prop.toLowerCase());
                if (formControl) {

                  formControl.setErrors({
                    serverError: validationErrors[prop][0]
                  });
                }
              });
            }
          );
      } else {
        value.id = commentId;
        value.important = value.important == 'true' ? true : false;
        value.expenseId = expenseId;

        this.commentService.update(value.id, value)
          .subscribe(
            _ => this.location.back(),
            err => {
              const validationErrors = err.error.errors;

              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.commentForm.get(prop.toLowerCase());
                if (formControl) {

                  formControl.setErrors({
                    serverError: validationErrors[prop][0]
                  });
                }
              });
            }
          );
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
