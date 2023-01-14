import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.sass'],
})
export class IssueDetailComponent implements OnInit {
  issue!: Issue;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.issue = <Issue>this.location.getState();
  }

  onNewComment(): void {
    this.router.navigateByUrl('/newComment', { state: this.issue });
  }
}
