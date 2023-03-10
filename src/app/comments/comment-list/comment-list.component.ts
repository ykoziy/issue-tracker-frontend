import { Component, Input, OnInit } from '@angular/core';
import { CommentData } from 'src/app/model/commentdata';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.sass'],
})
export class CommentListComponent implements OnInit {
  @Input() issueId!: number;
  commentData = <CommentData>{};

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments();
  }

  onModified(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentService
      .getComments(this.issueId)
      .subscribe((response: CommentData) => {
        this.commentData = response;
      });
  }

  handlePageChange(page: number) {
    this.commentService
      .getComments(this.issueId, page - 1)
      .subscribe((response: CommentData) => {
        this.commentData = response;
      });
  }
}
