import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CurrencyType } from '../shared/enums/currencyTypes.enum';
import { TypeType } from '../shared/enums/typeTypes.enum';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";

import { Expense } from '../shared/expense.model';
import { ExpenseService } from '../shared/expense.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})

export class ExpenseAddComponent implements OnInit {

  private routerLink: string = '../list';

  private expenseForm: FormGroup;
  public currencyTypes = Object.values(CurrencyType);
  public typeTypes = Object.values(TypeType);
  public expense: Expense;
  public id: string;

  constructor(
    private expenseService: ExpenseService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.addExpenseForm();
    this.getExpense();
  }

  addExpenseForm() {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      sum: [0, Validators.min(0)],
      location: ['', Validators.required],
      date: ['', Validators.required],
      currency: [0],
      type: [0]
    });

    //if (this.expenseForm && this.expense) {
    //  this.expenseForm.setValue({
    //    description: this.expense.description,
    //    sum: this.expense.sum,
    //    location: this.expense.location,
    //    date: this.expense.date,
    //    currency: this.expense.currency,
    //    type: this.expense.type
    //  });
    //}
  }

  getExpense() {
    var id = parseInt(this.route.snapshot.paramMap.get('id'));

    if (id !== 0) {
      this.expenseService.getExpense(id)
        .subscribe(result => {
          this.expense = result;

          if (this.expense !== null) {
            this.expenseForm.setValue({
              description: this.expense.description,
              sum: this.expense.sum,
              location: this.expense.location,
              date: this.expense.date,
              currency: this.expense.currency,
              type: this.expense.type
            });
          }
        });
    }
  }


  onSubmit({ value, valid }) {

    if (valid) {
      var id = parseInt(this.route.snapshot.paramMap.get('id'));

      if (id === 0) {
        this.expenseService.add(value)
          .subscribe(
            _ => this.router.navigate(['/list']),
            err => {
              const validationErrors = err.error.errors;

              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.expenseForm.get(prop.toLowerCase());
                if (formControl) {

                  formControl.setErrors({
                    serverError: validationErrors[prop][0]
                  });
                }
              });
            }
          );
      } else {
        value.id = id;
        this.expenseService.update(id, value)
          .subscribe(
            _ => this.router.navigate(['/list']),
            err => {
              const validationErrors = err.error.errors;

              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.expenseForm.get(prop.toLowerCase());
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

  //goBack() {
  //  this.location.back();
  //}
}
