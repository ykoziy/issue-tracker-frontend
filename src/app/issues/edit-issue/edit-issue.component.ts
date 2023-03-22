import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.sass'],
})
export class EditIssueComponent implements OnInit {
  editIssueForm: FormGroup;
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;
  issue!: Issue;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationModalService: ConfirmationModalService
  ) {
    this.editIssueForm = this.formBuilder.group({
      issueTitle: ['', [Validators.required, Validators.minLength(5)]],
      issueDescription: ['', [Validators.required]],
      issuePriority: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.issue = response.issue;
    });

    this.editIssueForm.patchValue({
      issueTitle: this.issue.title,
      issueDescription: this.issue.description,
      issuePriority: this.issue.priority,
    });

    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
  }

  async onSubmit(): Promise<void> {
    if (this.editIssueForm.valid) {
      const message = 'This will update the issue. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.saveIssue();
      }
    }
  }

  saveIssue(): void {
    const userId = this.loginService.getUserId();
    if (userId !== 0) {
      const updatedIssue: Issue = { ...this.issue };
      updatedIssue.title = this.editIssueForm.value.issueTitle;
      updatedIssue.description = this.editIssueForm.value.issueDescription;
      updatedIssue.priority = this.editIssueForm.value.issuePriority;

      this.issueService.editIssue(updatedIssue).subscribe({
        next: () => {
          this.router.navigate(['/issues']);
        },
      });
    }
  }
}
