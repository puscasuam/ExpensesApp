import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseComponent } from './expense.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { CommentAddComponent } from '../comments/comment-add/comment-add.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

const routes: Routes = [
  {
    path: '', component: ExpenseComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' }, 
      { path: 'list', component: ExpenseListComponent },
      { path: 'list/:id', component: ExpenseDetailComponent },
      { path: 'add/:id', component: ExpenseAddComponent },
      { path: 'list/add/:eid/comment-add/:cid', component: CommentAddComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExpensesRoutingModule {
  static routedComponents = [ExpenseComponent, ExpenseListComponent, ExpenseDetailComponent, ExpenseAddComponent, CommentAddComponent];
}
