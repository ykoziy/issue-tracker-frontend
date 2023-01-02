import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  constructor() {}

  ngOnInit(): void {}

  onEdit(): void {
    console.log('edit comment');
  }

  onDelete(): void {
    console.log('delete comment');
  }
}
