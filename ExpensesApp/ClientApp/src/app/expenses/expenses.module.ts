import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ExpensesRoutingModule } from "./expenses-routing.module";
import { ExpenseService } from "./shared/expense.service";
import { ExpenseFilterPipe } from "./expense-filter.pipe";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { CoreModule } from "../core/core.module";

 

@NgModule({
  declarations:
    [ExpenseFilterPipe, ExpensesRoutingModule.routedComponents],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    AngularMaterialModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [ExpenseService],
})
export class ExpensesModule { }
