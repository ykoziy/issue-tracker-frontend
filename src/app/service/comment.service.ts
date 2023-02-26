import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { NewComment } from '../interfaces/newcomment';
import { CommentData } from '../model/commentdata';

@Injectable()
export class CommentService {
  configUrl: string = 'http://localhost:8080/api/v1/comment';

  constructor(private http: HttpClient) {}

  private urlParamBuilder(isNew: boolean, page?: number, size?: number) {
    let params: string = '';
    if (isNew === true) {
      params += '?';
    } else {
      params += '&';
    }

    if (page && size) {
      params += `page=${page}&size=${size}`;
    } else if (page) {
      params += `page=${page}`;
    } else if (size) {
      params += `size=${size}`;
    }
    return params;
  }

  getComments(
    issueId: number,
    page?: number,
    size?: number
  ): Observable<CommentData> {
    let url = `${this.configUrl}?issueId=${issueId}`;
    url += this.urlParamBuilder(false, page, size);
    return this.http.get<CommentData>(url);
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
