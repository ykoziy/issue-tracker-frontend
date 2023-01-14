import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Issue } from 'src/app/interfaces/issue';
import { NewComment } from 'src/app/interfaces/newcomment';
import { CommentService } from 'src/app/service/comment.service';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.sass'],
})
export class NewCommentComponent implements OnInit {
  issue!: Issue;
  newCommentForm = {} as FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private commentService: CommentService,
    private loginService: LoginService
  ) {}

  // to make new comment need:
  // text, userID and issueId
  // make sure issue is not closed/resolved before adding comment??

  ngOnInit(): void {
    this.issue = <Issue>this.location.getState();
    this.newCommentForm = this.formBuilder.group({
      userComment: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.newCommentForm.valid) {
      let newComment: NewComment = {
        content: this.newCommentForm.value.userComment,
        userId: this.loginService.getUserId(),
        issueId: this.issue.id,
      };
      this.commentService.newComment(newComment).subscribe({
        next: () => this.router.navigate(['/issues']),
      });
    }
  }
}
