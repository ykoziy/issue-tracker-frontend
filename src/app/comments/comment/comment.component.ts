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
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/service/comment.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass'],
})
export class CommentComponent implements OnInit {
  @Output()
  commentModifiedEvent = new EventEmitter();
  @Input() comment!: Comment;
  userId: number = 0;
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  constructor(
    private commentService: CommentService,
    private loginService: LoginService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId();
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
  }

  onEdit(): void {
    if (this.comment.authorId === this.userId) {
      this.router.navigate(['/editComment'], { state: this.comment });
    }
  }

  async onDelete(): Promise<void> {
    if (this.userId !== 0) {
      const message = 'This will delete the comment. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.deleteComment();
      }
    }
  }

  deleteComment(): void {
    this.router.navigate(['/issue', this.comment.issueId]);
    this.commentService.deleteComment(this.userId, this.comment.id).subscribe({
      next: () => this.commentModifiedEvent.emit(),
    });
  }

  isUserComment(authorId: number): boolean {
    return this.userId === authorId;
  }

  isAdmin(): boolean {
    const role = this.loginService.getUserRole();
    if (role === 'ADMIN') {
      return true;
    }
    return false;
  }
}
