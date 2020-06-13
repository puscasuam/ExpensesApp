import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  id: string;

  constructor
    (private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  getAllExpenses(): Observable<Expense[]>
  {
    return this.httpClient.get<Array<Expense>>(this.baseUrl + 'api/Expenses');
  }

  getExpense(id: number): Observable<Expense>
  {
    //return this.httpClient.get<Expense>('${this.baseUrl}api/Expenses/${id}');
    return this.httpClient.get<Expense>(this.baseUrl + 'api/Expenses/' + id);
  }

  add(expense: Expense): Observable<Expense>
  {
    return this.httpClient.post<Expense>(this.baseUrl + 'api/Expenses', expense);
  }

  delete(id: number): Observable<Expense>
  {
    return this.httpClient.delete<Expense>(this.baseUrl + 'api/Expenses/' + id);
  }

  update(id: number, expense: Expense): Observable<Expense> {
    return this.httpClient.put<Expense>(this.baseUrl + 'api/Expenses/' + id, expense);
  }

}
