import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { NewIssue } from 'src/app/interfaces/newissue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmComponent } from 'src/app/shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.sass'],
})
export class NewIssueComponent implements OnInit {
  newIssueForm = {} as FormGroup;

  @ViewChild(AnchorDirective, { static: false })
  modalHost!: AnchorDirective;
  private cancelSub!: Subscription;
  private okSub!: Subscription;
  private message = 'This will create a new issue. Are you sure?';

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
    if (this.newIssueForm.valid) {
      this.showConfirmation();
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
