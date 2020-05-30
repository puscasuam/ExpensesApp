import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  id: string;

  constructor
    (private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  getAllComments(): Observable<Comment[]>
  {
    return this.httpClient.get<Array<Comment>>(this.baseUrl + 'api/Comments');
  }

  getComment(id: string): Observable<Comment>
  {
    return this.httpClient.get<Comment>(this.baseUrl + 'api/Comments/' + id);
  }

  add(comment: Comment): Observable<Comment>
  {
    return this.httpClient.post<Comment>(this.baseUrl + 'api/Comments', comment);
  }

  delete(id: number): Observable<Comment>
  {
    return this.httpClient.delete<Comment>(this.baseUrl + 'api/Comments/' + id);
  }

  update(id: string, comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(this.baseUrl + 'api/Comments/' + id, comment);
  }

}
