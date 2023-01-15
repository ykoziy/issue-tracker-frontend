import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Issue } from '../interfaces/issue';
import { IssueService } from '../service/issue.service';

@Injectable()
export class IssueResolver implements Resolve<Issue[]> {
  configUrl: string = 'http://localhost:8080/api/v1/issue';

  constructor(private issueService: IssueService, private http: HttpClient) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Issue[] | Observable<Issue[]> | Promise<Issue[]> {
    return this.issueService.getIssues();
  }
}
