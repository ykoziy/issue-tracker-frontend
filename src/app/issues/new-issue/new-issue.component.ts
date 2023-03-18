import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { NewIssue } from 'src/app/interfaces/newissue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.sass'],
})
export class NewIssueComponent implements OnInit {
  newIssueForm: FormGroup;

  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private loginService: LoginService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {
    this.newIssueForm = this.formBuilder.group({
      issueTitle: ['', [Validators.required, Validators.minLength(5)]],
      issueDescription: ['', [Validators.required]],
      issuePriority: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
  }

  async onSubmit(): Promise<void> {
    if (this.newIssueForm.valid) {
      const message = 'This will create a new issue. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.saveIssue();
      }
    }
  }

  saveIssue(): void {
    const userId = this.loginService.getUserId();
    if (userId !== 0) {
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
