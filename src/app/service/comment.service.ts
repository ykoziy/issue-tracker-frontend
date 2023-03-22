import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { NewComment } from '../interfaces/newcomment';
import { CommentData } from '../model/commentdata';
import { HttpUtils } from '../shared/util/http-utils';

@Injectable()
export class CommentService {
  configUrl: string = 'http://localhost:8080/api/v1/comments';

  constructor(private http: HttpClient) {}

  getComments(
    issueId: number,
    page?: number,
    size?: number
  ): Observable<CommentData> {
    const urlBase: string = 'http://localhost:8080/api/v1/issues';
    let url = `${urlBase}/${issueId}/comments`;
    let params: HttpParams = HttpUtils.buildHttpParams({
      page: page,
      size: size,
    });
    return this.http.get<CommentData>(url, { params });
  }

  newComment(newComment: NewComment): Observable<any> {
    const body = JSON.stringify(newComment);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.configUrl, body, { headers: headers });
  }

  editComment(comment: Comment): Observable<any> {
    const body = JSON.stringify(comment);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}`;
    return this.http.put(url, body, { headers: headers });
  }

  deleteComment(commentId: number): Observable<any> {
    const url = `${this.configUrl}/${commentId}`;
    return this.http.delete(url);
  }

  //TODO: reply to comment??
}
