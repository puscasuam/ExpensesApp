import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expenses/expense.component';
import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
import { ExpenseAddComponent } from './expenses/expense-add/expense-add.component';
import { ExpenseUpdateComponent } from './expenses/expense-update/expense-update.component';
import { ExpenseFilterPipe } from './expenses/expense-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ExpenseFilterPipe,
    HomeComponent,
    ExpenseComponent,
    ExpenseDetailComponent,
    ExpenseAddComponent,
    ExpenseUpdateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'expenses', component: ExpenseComponent },
      { path: 'expenses/:id', component: ExpenseDetailComponent },
      { path: 'expense-add/:id', component: ExpenseAddComponent },
      //{ path: 'expenses-update/:id', component: ExpenseUpdateComponent }, 
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
