import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { CloseIssue } from 'src/app/interfaces/closeissue';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-close-issue',
  templateUrl: './close-issue.component.html',
  styleUrls: ['./close-issue.component.sass'],
})
export class CloseIssueComponent implements OnInit {
  closeIssueForm = {} as FormGroup;
  issue!: Issue;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.issue = response.issue;
    });
    this.closeIssueForm = this.formBuilder.group({
      resolution: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    const userId = this.loginService.getUserId();
    if (this.closeIssueForm.valid && userId !== 0 && this.issue.id) {
      const closeIssue: CloseIssue = {
        resolution: this.closeIssueForm.value.resolution,
        userId: userId,
        issueId: this.issue.id,
      };
      this.issueService.closeIssue(closeIssue).subscribe({
        next: () => this.router.navigate(['/issues']),
      });
    }
  }
}
