import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login.service';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/service/comment.service';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { ConfirmComponent } from 'src/app/shared/modal/confirm/confirm.component';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass'],
})
export class EditCommentComponent implements OnInit {
  comment!: Comment;
  editCommentForm = {} as FormGroup;
  @ViewChild(AnchorDirective, { static: false })
  modalHost!: AnchorDirective;
  private cancelSub!: Subscription;
  private okSub!: Subscription;
  private message = 'This will update the comment. Are you sure?';

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

  saveComment(): void {
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

  onSubmit(): void {
    if (this.editCommentForm.valid) {
      this.showConfirmation();
    }
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
      this.saveComment();
      this.okSub.unsubscribe();
      confirmRef.destroy();
    });
  }
}
