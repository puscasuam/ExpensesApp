import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExpensesRoutingModule } from "./expenses-routing.module";

import { ExpenseService } from "./shared/expense.service";

import { ExpenseFilterPipe } from "./expense-filter.pipe";

 

@NgModule({
  declarations:
    [ExpenseFilterPipe, ExpensesRoutingModule.routedComponents],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    MatIconModule,
    //BrowserAnimationsModule,
    //AngularMaterialModule,
    //CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [ExpenseService],
})
export class ExpensesModule { }
