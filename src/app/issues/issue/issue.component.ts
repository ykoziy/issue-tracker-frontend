import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmComponent } from 'src/app/shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.sass'],
})
export class IssueComponent implements OnInit {
  @Input() issue!: Issue;
  userId: number = 0;

  @ViewChild(AnchorDirective, { static: false })
  modalHost!: AnchorDirective;
  private cancelSub!: Subscription;
  private okSub!: Subscription;
  private message = 'This will delete the issue. Are you sure?';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private issueService: IssueService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId();
  }

  viewDetails(): void {
    this.router.navigate(['/issue', this.issue.id]);
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

  setStatusClass(status: string): string {
    if (status.toLocaleLowerCase() === 'open') {
      return 'bg-info';
    } else if (status.toLocaleLowerCase() === 'wip') {
      return 'bg-dark';
    } else if (status.toLocaleLowerCase() === 'closed') {
      return 'bg-secondary';
    }
    return '';
  }

  onEditIssue(event: Event): void {
    event.stopPropagation();
    if (this.issue.creatorId === this.userId) {
      this.router.navigate([`/issue/${this.issue.id}/edit`]);
    }
  }

  onCloseIssue(event: Event): void {
    event.stopPropagation();
    this.router.navigate([`/issue/${this.issue.id}/close`]);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    if (this.userId !== 0) {
      this.showConfirmation();
    }
  }

  deleteIssue(): void {
    this.issueService.deleteIssue(this.userId, this.issue.id).subscribe({
      next: () => this.router.navigate(['/issues']),
    });
  }

  isUserIssue(): boolean {
    return this.userId === this.issue.creatorId;
  }

  isAdmin(): boolean {
    const role = this.loginService.getUserRole();
    if (role === 'ADMIN') {
      return true;
    }
    return false;
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
      this.deleteIssue();
      this.okSub.unsubscribe();
      confirmRef.destroy();
    });
  }
}
