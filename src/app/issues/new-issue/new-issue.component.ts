import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { NewIssue } from 'src/app/interfaces/newissue';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.sass'],
})
export class NewIssueComponent implements OnInit {
  newIssueForm = {} as FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newIssueForm = this.formBuilder.group({
      issueTitle: ['', [Validators.required, Validators.minLength(5)]],
      issueDescription: ['', [Validators.required]],
      issuePriority: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const userId = this.loginService.getUserId();
    if (this.newIssueForm.valid && userId !== 0) {
      let newIssue: NewIssue = {
        title: this.newIssueForm.value.issueTitle,
        description: this.newIssueForm.value.issueDescription,
        priority: this.newIssueForm.value.issuePriority,
        userId: userId,
      };
      this.issueService.newIssue(newIssue).subscribe({
        next: () => this.router.navigate(['/issues']),
      });
    }
  }
}
