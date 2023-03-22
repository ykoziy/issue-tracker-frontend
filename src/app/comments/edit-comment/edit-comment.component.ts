import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/service/comment.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmationModalService } from 'src/app/shared/modal/confirmation-modal.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass'],
})
export class EditCommentComponent implements OnInit {
  comment!: Comment;
  editCommentForm = {} as FormGroup;
  @ViewChild(AnchorDirective, { static: true })
  modalHost!: AnchorDirective;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private commentService: CommentService,
    private loginService: LoginService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.comment = <Comment>this.location.getState();
    this.editCommentForm = this.formBuilder.group({
      userComment: ['', [Validators.required]],
    });
    this.editCommentForm.patchValue({
      userComment: this.comment.content,
    });
    this.confirmationModalService.setViewContainerRef(
      this.modalHost.viewContainerRef
    );
  }

  saveComment(): void {
    const updateComment: Comment = { ...this.comment };
    updateComment.content = this.editCommentForm.value.userComment;
    const userId = this.loginService.getUserId();
    if (userId != 0) {
      this.commentService.editComment(updateComment).subscribe({
        next: () => {
          this.router.navigate(['/issue', this.comment.issueId]);
        },
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.editCommentForm.valid) {
      const message = 'This will update the comment. Are you sure?';
      const result = await this.confirmationModalService.confirm(message);
      if (result) {
        this.saveComment();
      }
    }
  }
}
