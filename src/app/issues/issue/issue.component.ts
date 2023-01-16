import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.sass'],
})
export class IssueComponent implements OnInit {
  @Input() issue!: Issue;
  userId: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId();
  }

  viewDetails(): void {
    this.router.navigate(['/issue', this.issue.id]);
  }

  setPriorityClass(priority: string): string {
    if (priority.toLocaleLowerCase() === 'low') {
      return 'bg-success';
    } else if (priority.toLocaleLowerCase() === 'medium') {
      return 'bg-warning';
    } else if (priority.toLocaleLowerCase() === 'high') {
      return 'bg-danger';
    }
    return '';
  }

  setStatusClass(status: string): string {
    if (status.toLocaleLowerCase() === 'open') {
      return 'bg-info';
    } else if (status.toLocaleLowerCase() === 'wip') {
      return 'bg-light';
    } else if (status.toLocaleLowerCase() === 'closed') {
      return 'bg-secondary';
    }
    return '';
  }

  onCloseIssue(): void {
    this.router.navigate([`/issue/${this.issue.id}/close`], {
      state: this.issue,
    });
  }

  isUserIssue(): boolean {
    return this.userId === this.issue.creatorId;
  }
}
