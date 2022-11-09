import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.sass'],
})
export class IssueComponent implements OnInit {
  @Input() issue!: Issue;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetails(issue: Issue): void {
    this.router.navigateByUrl('/issue', { state: issue });
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
}
