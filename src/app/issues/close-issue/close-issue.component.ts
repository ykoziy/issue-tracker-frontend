import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { CloseIssue } from 'src/app/interfaces/closeissue';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-close-issue',
  templateUrl: './close-issue.component.html',
  styleUrls: ['./close-issue.component.sass'],
})
export class CloseIssueComponent implements OnInit {
  closeIssueForm = {} as FormGroup;
  issue!: Issue;

  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.issue = response.issue;
    });
    this.closeIssueForm = this.formBuilder.group({
      resolution: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
  }

  async onSubmit(): Promise<void> {
    if (this.closeIssueForm.valid && this.issue.id) {
      const message = 'This will close the issue. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.closeIssue();
      }
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
}
