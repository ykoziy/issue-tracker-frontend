import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IssueData } from '../model/issuedata';
import { IssueService } from '../service/issue.service';

@Injectable()
export class IssuesResolver implements Resolve<IssueData> {
  constructor(private issueService: IssueService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IssueData | Observable<IssueData> | Promise<IssueData> {
    return this.issueService.getIssues({});
  }
}
