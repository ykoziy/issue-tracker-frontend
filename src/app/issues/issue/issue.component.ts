import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Issue } from 'src/app/interfaces/issue';
import { IssueService } from 'src/app/service/issue.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.sass'],
})
export class IssueComponent implements OnInit {
  @Input() issue!: Issue;
  userId: number = 0;
  @Output() deleted = new EventEmitter<void>();
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private issueService: IssueService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId();
    const role = this.loginService.getUserRole();
    if (role === 'ADMIN') {
      this.isAdmin = true;
    }
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
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
    if (this.issue.creatorId === this.userId || this.isAdmin) {
      this.router.navigate([`/issue/${this.issue.id}/edit`]);
    }
  }

  onCloseIssue(event: Event): void {
    event.stopPropagation();
    if (this.issue.creatorId === this.userId || this.isAdmin) {
      this.router.navigate([`/issue/${this.issue.id}/close`]);
    }
  }

  async onDelete(event: Event): Promise<void> {
    event.stopPropagation();
    if (this.issue.creatorId === this.userId || this.isAdmin) {
      const message = 'This will delete the issue. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.deleteIssue();
      }
    }
  }

  deleteIssue(): void {
    this.issueService.deleteIssue(this.userId, this.issue.id).subscribe({
      next: () => this.deleted.emit(),
    });
  }

  isUserIssue(): boolean {
    return this.userId === this.issue.creatorId;
  }
}
