import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.sass'],
})
export class IssueDetailComponent implements OnInit {
  issue!: Issue;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.issue = response.issue;
    });
  }

  onNewComment(): void {
    this.router.navigateByUrl('/newComment', { state: this.issue });
  }
}
