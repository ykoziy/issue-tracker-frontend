import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Issue } from 'src/app/interfaces/issue';
import { NewComment } from 'src/app/interfaces/newcomment';
import { CommentService } from 'src/app/service/comment.service';
import { LoginService } from 'src/app/auth/login.service';
import { ConfirmComponent } from 'src/app/shared/modal/confirm/confirm.component';
import { AnchorDirective } from 'src/app/shared/modal/anchor.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.sass'],
})
export class NewCommentComponent implements OnInit, OnDestroy {
  issue!: Issue;
  newCommentForm = {} as FormGroup;
  @ViewChild(AnchorDirective, { static: false })
  modalHost!: AnchorDirective;
  private cancelSub!: Subscription;
  private okSub!: Subscription;
  private message = 'This will add a new comment. Are you sure?';

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private commentService: CommentService,
    private loginService: LoginService
  ) {}

  ngOnDestroy(): void {
    if (this.cancelSub) {
      this.cancelSub.unsubscribe();
    }
    if (this.okSub) {
      this.okSub.unsubscribe();
    }
  }

  // make sure issue is not closed/resolved before adding comment??

  ngOnInit(): void {
    this.issue = <Issue>this.location.getState();
    this.newCommentForm = this.formBuilder.group({
      userComment: ['', [Validators.required]],
    });
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

  onSubmit(): void {
    if (this.newCommentForm.valid) {
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
