import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CurrencyType } from '../shared/enums/currencyTypes.enum';
import { TypeType } from '../shared/enums/typeTypes.enum';
import { Location } from '@angular/common';

import { Expense } from '../shared/expense.model';
import { ExpenseService } from '../shared/expense.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.css']
})

export class ExpenseUpdateComponent implements OnInit {
  private expense: Expense;
  private id: string;
  private expenseForm: FormGroup;
  public currencyTypes = Object.values(CurrencyType);
  public typeTypes = Object.values(TypeType);


  constructor(
    private expenseService: ExpenseService,
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.expense;
    this.updateExpenseForm();
  }

  getExpense() {
    var id = this.route.snapshot.paramMap.get('id');

    this.expenseService.getExpense(id)
      .subscribe(result => this.expense = result);
  }

  updateExpenseForm() {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      sum: [0, Validators.min(0)],
      location: ['', Validators.required],
      date: ['', Validators.required],
      currency: [0],
      type: [0]
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.expenseService.add(value)
        .subscribe(
          _ => this.location.back(),
          err => {

            console.log(err);
            const validationErrors = err.error.errors;

            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.expenseForm.get(prop.toLowerCase());
              if (formControl) {

                console.log(prop.toLowerCase);
                console.log(prop);

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
