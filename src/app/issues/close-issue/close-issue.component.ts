import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { CloseIssue } from 'src/app/interfaces/closeissue';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmComponent } from 'src/app/shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-close-issue',
  templateUrl: './close-issue.component.html',
  styleUrls: ['./close-issue.component.sass'],
})
export class CloseIssueComponent implements OnInit {
  closeIssueForm = {} as FormGroup;
  issue!: Issue;

  @ViewChild(AnchorDirective, { static: false })
  modalHost!: AnchorDirective;
  private cancelSub!: Subscription;
  private okSub!: Subscription;
  private message = 'This will close the issue. Are you sure?';

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
    if (this.closeIssueForm.valid && this.issue.id) {
      this.showConfirmation();
    }
  }

  closeIssue(): void {
    const userId = this.loginService.getUserId();
    if (userId !== 0) {
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
      this.closeIssue();
      this.okSub.unsubscribe();
      confirmRef.destroy();
    });
  }
}
