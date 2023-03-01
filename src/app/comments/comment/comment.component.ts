import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/service/comment.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmComponent } from 'src/app/shared/modal/confirm/confirm.component';

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

  @ViewChild(AnchorDirective, { static: false })
  modalHost!: AnchorDirective;
  private cancelSub!: Subscription;
  private okSub!: Subscription;
  private message = 'This will delete the comment. Are you sure?';

  constructor(
    private commentService: CommentService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId();
  }

  onEdit(): void {
    if (this.comment.authorId === this.userId) {
      this.router.navigate(['/editComment'], { state: this.comment });
    }
  }

  onDelete(): void {
    if (this.userId !== 0) {
      this.showConfirmation();
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
      this.deleteComment();
      this.okSub.unsubscribe();
      confirmRef.destroy();
    });
  }
}
