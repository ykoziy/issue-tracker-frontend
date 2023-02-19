import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Issue } from 'src/app/interfaces/issue';
import { NewIssue } from 'src/app/interfaces/newissue';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.sass'],
})
export class EditIssueComponent implements OnInit {
  editIssueForm = {} as FormGroup;
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

    this.editIssueForm = this.formBuilder.group({
      issueTitle: ['', [Validators.required, Validators.minLength(5)]],
      issueDescription: ['', [Validators.required]],
      issuePriority: ['', [Validators.required]],
    });

    this.editIssueForm.patchValue({
      issueTitle: this.issue.title,
      issueDescription: this.issue.description,
      issuePriority: this.issue.priority,
    });
  }

  onSubmit(): void {
    const userId = this.loginService.getUserId();
    if (this.editIssueForm.valid && userId !== 0) {
      const updatedIssue: Issue = { ...this.issue };
      updatedIssue.title = this.editIssueForm.value.issueTitle;
      updatedIssue.description = this.editIssueForm.value.issueDescription;
      updatedIssue.priority = this.editIssueForm.value.issuePriority;
      const userId = this.loginService.getUserId();

      console.log(updatedIssue);
      this.issueService.editIssue(userId, updatedIssue).subscribe({
        next: () => {
          this.router.navigate(['/issues']);
        },
      });
    }
  }
}
