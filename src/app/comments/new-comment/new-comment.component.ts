import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Issue } from 'src/app/interfaces/issue';
import { NewComment } from 'src/app/interfaces/newcomment';
import { CommentService } from 'src/app/service/comment.service';
import { LoginService } from 'src/app/auth/login.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.sass'],
})
export class NewCommentComponent implements OnInit {
  issue!: Issue;
  newCommentForm = {} as FormGroup;
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private commentService: CommentService,
    private loginService: LoginService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  // make sure issue is not closed/resolved before adding comment??

  ngOnInit(): void {
    this.issue = <Issue>this.location.getState();
    this.newCommentForm = this.formBuilder.group({
      userComment: ['', [Validators.required]],
    });
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
  }

  saveComment(): void {
    let newComment: NewComment = {
      content: this.newCommentForm.value.userComment,
      userId: this.loginService.getUserId(),
      issueId: this.issue.id,
    };
    this.commentService.newComment(newComment).subscribe({
      next: () => this.router.navigate(['/issue', this.issue.id]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.newCommentForm.valid) {
      const message = 'This will add a new comment. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.saveComment();
      }
    }
  }
}
