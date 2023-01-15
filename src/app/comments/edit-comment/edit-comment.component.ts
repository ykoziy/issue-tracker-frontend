import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass'],
})
export class EditCommentComponent implements OnInit {
  comment!: Comment;
  editCommentForm = {} as FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private commentService: CommentService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.comment = <Comment>this.location.getState();
    this.editCommentForm = this.formBuilder.group({
      userComment: ['', [Validators.required]],
    });
    this.editCommentForm.patchValue({
      userComment: this.comment.content,
    });
  }

  onSubmit(): void {
    if (this.editCommentForm.valid) {
      const updateComment: Comment = { ...this.comment };
      updateComment.content = this.editCommentForm.value.userComment;
      const userId = this.loginService.getUserId();
      if (userId != 0) {
        this.commentService.editComment(userId, updateComment).subscribe({
          next: () => {
            this.router.navigate(['/issue', this.comment.issueId]);
          },
        });
      }
    }
  }
}
