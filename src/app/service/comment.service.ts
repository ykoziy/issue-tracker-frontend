import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { NewComment } from '../interfaces/newcomment';

@Injectable()
export class CommentService {
  configUrl: string = 'http://localhost:8080/api/v1/comment';

  constructor(private http: HttpClient) {}

  getComments(issueId: number): Observable<Comment[]> {
    const url = `${this.configUrl}?issueId=${issueId}`;
    return this.http.get<Comment[]>(url);
  }

  newComment(newComment: NewComment): Observable<any> {
    const body = JSON.stringify(newComment);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.configUrl, body, { headers: headers });
  }

  editComment(userId: number, comment: Comment): Observable<any> {
    const body = JSON.stringify(comment);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/edit?userId=${userId}`;
    return this.http.post(url, body, { headers: headers });
  }

  deleteComment(userId: number, commentId: number): Observable<any> {
    const url = `${this.configUrl}?userId=${userId}&commentId=${commentId}`;
    return this.http.delete(url);
  }

  //TODO: reply to comment??
}
