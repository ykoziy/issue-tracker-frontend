import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
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
import { RegistrationService } from './service/registration.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService, IssueService, CommentService, RegistrationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
