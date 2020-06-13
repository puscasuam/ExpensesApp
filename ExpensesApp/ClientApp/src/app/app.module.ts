import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
//import { ExpenseComponent } from './expenses/expense.component';
//import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
//import { ExpenseAddComponent } from './expenses/expense-add/expense-add.component';
import { ExpenseFilterPipe } from './expenses/expense-filter.pipe';
//import { CommentsComponent } from './comments/comments.component';
//import { CommentAddComponent } from './comments/comment-add/comment-add.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'expenses', loadChildren: './expenses/expenses.module#ExpensesModule' },

  //{ path: 'expenses', component: ExpenseComponent },
  //{ path: 'expenses/:id', component: ExpenseDetailComponent },
  //{ path: 'expense-add/:id', component: ExpenseAddComponent },

  //{ path: 'expenses/:eid/comment-add/:cid', component: CommentAddComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    //ExpenseComponent,
    //ExpenseDetailComponent,
    //ExpenseAddComponent,
    //CommentsComponent,
    //CommentAddComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    //CommonModule,
    FormsModule,
    //ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  exports: [MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
