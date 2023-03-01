import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './auth/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IssueService } from './service/issue.service';
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CommentService } from './service/comment.service';
import { CommentComponent } from './comments/comment/comment.component';
import { DateDiffPipe } from './pipes/date-diff.pipe';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { IssueDetailComponent } from './issues/issue-detail/issue-detail.component';
import { IssueComponent } from './issues/issue/issue.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { RegisterComponent } from './user/register/register.component';
import { RegistrationService } from './auth/registration.service';
import { AuthInterceptorService } from './auth/authInterceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { IssuesResolver } from './issues/issues-resolver.service';
import { IssueResolver } from './issues/issue-resolver.service';
import { EditCommentComponent } from './comments/edit-comment/edit-comment.component';
import { CloseIssueComponent } from './issues/close-issue/close-issue.component';
import { AdminComponent } from './admin/admin.component';
import { EditIssueComponent } from './issues/edit-issue/edit-issue.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmComponent } from './shared/modal/confirm/confirm.component';
import { AnchorDirective } from './shared/modal/anchor.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    IssueComponent,
    IssueListComponent,
    IssueDetailComponent,
    NewIssueComponent,
    ProfileComponent,
    CommentListComponent,
    CommentComponent,
    DateDiffPipe,
    RegisterComponent,
    NewCommentComponent,
    EditCommentComponent,
    CloseIssueComponent,
    AdminComponent,
    EditIssueComponent,
    ConfirmComponent,
    AnchorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    LoginService,
    IssueService,
    CommentService,
    RegistrationService,
    IssuesResolver,
    IssueResolver,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
