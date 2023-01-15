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
export class IssuesResolver implements Resolve<Issue[]> {
  constructor(private issueService: IssueService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Issue[] | Observable<Issue[]> | Promise<Issue[]> {
    return this.issueService.getIssues();
  }
}
