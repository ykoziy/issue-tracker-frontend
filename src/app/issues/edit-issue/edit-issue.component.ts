import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmComponent } from 'src/app/shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.sass'],
})
export class EditIssueComponent implements OnInit {
  editIssueForm = {} as FormGroup;
  @ViewChild(AnchorDirective, { static: false })
  modalHost!: AnchorDirective;
  private cancelSub!: Subscription;
  private okSub!: Subscription;
  private message = 'This will update the issue. Are you sure?';

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
    if (this.editIssueForm.valid) {
      this.showConfirmation();
    }
  }

  saveIssue(): void {
    const userId = this.loginService.getUserId();
    if (userId !== 0) {
      const updatedIssue: Issue = { ...this.issue };
      updatedIssue.title = this.editIssueForm.value.issueTitle;
      updatedIssue.description = this.editIssueForm.value.issueDescription;
      updatedIssue.priority = this.editIssueForm.value.issuePriority;

      this.issueService.editIssue(userId, updatedIssue).subscribe({
        next: () => {
          this.router.navigate(['/issues']);
        },
      });
    }
  }

  showConfirmation(): void {
    const confirmRef =
      this.modalHost.viewContainerRef.createComponent<ConfirmComponent>(
        ConfirmComponent
      );

    confirmRef.instance.message = this.message;

    this.cancelSub = confirmRef.instance.cancel.subscribe(() => {
      this.cancelSub.unsubscribe();
      confirmRef.destroy();
    });

    this.okSub = confirmRef.instance.ok.subscribe(() => {
      this.saveIssue();
      this.okSub.unsubscribe();
      confirmRef.destroy();
    });
  }
}
