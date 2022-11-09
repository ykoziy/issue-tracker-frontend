import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';

@Injectable()
export class CommentService {
  configUrl: string = 'http://localhost:8080/api/v1/comment';

  constructor(private http: HttpClient) {}

  getComments(issueId: number): Observable<Comment[]> {
    const url = `${this.configUrl}?issueId=${issueId}`;
    return this.http.get<Comment[]>(url);
  }
}
