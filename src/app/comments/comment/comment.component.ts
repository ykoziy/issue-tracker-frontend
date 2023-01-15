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

  constructor(
    private commentService: CommentService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onEdit(): void {
    console.log('edit comment');
  }

  onDelete(): void {
    const userId = this.loginService.getUserId();
    if (userId !== 0) {
      this.router.navigate(['/issue', this.comment.issueId]);
      this.commentService.deleteComment(userId, this.comment.id).subscribe({
        next: () => this.commentModifiedEvent.emit(),
      });
    }
  }
}
