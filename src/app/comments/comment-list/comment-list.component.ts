import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.sass'],
})
export class CommentListComponent implements OnInit {
  @Input() issueId!: number;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments();
  }

  onModified(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentService.getComments(this.issueId).subscribe((commentData) => {
      this.comments = commentData;
    });
  }
}
