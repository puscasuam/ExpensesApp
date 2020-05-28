import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expenses/expense.component';
import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
import { ExpenseAddComponent } from './expenses/expense-add/expense-add.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ExpenseComponent,
    ExpenseDetailComponent,
    ExpenseAddComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'expenses', component: ExpenseComponent },
      { path: 'expenses/:id', component: ExpenseDetailComponent },
      { path: 'expense-add', component: ExpenseAddComponent }, 
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
