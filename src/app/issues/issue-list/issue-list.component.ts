import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.sass'],
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.issues = response.issues;
    });
  }
}
