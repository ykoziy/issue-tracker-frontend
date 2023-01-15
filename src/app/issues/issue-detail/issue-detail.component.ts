import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.sass'],
})
export class IssueDetailComponent implements OnInit {
  issue!: Issue;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getIssue();
  }

  getIssue(): void {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.issueService.getIssue(id).subscribe((issue) => (this.issue = issue));
    });
  }

  onNewComment(): void {
    this.router.navigateByUrl('/newComment', { state: this.issue });
  }
}
