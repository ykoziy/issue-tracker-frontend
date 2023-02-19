import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/service/comment.service';

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
      this.router.navigate(['/issue', this.comment.issueId]);
      this.commentService
        .deleteComment(this.userId, this.comment.id)
        .subscribe({
          next: () => this.commentModifiedEvent.emit(),
        });
    }
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
