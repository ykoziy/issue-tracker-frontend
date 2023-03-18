import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IssueData } from 'src/app/model/issuedata';
import { IssueService } from 'src/app/service/issue.service';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.sass'],
})
export class IssueListComponent implements OnInit {
  filterForm: FormGroup = {} as FormGroup;
  issueData: IssueData = <IssueData>{};
  filterPriority: string = '';
  filterStatus: string = '';
  filterOwnIssues: boolean = false;
  userId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId();
    this.route.data.subscribe((response: any) => {
      this.issueData = response.issues;
    });

    this.filterForm = this.formBuilder.group({
      issuePriority: [''],
      issueStatus: [''],
      myIssues: [false],
    });
  }

  onSubmit(): void {
    this.filterPriority = this.filterForm.value.issuePriority;
    this.filterStatus = this.filterForm.value.issueStatus;
    this.filterOwnIssues = this.filterForm.value.myIssues;
    this.updatePage();
  }

  updatePage(page?: number) {
    let queryParams: any = {};
    if (this.filterOwnIssues === true) {
      queryParams.creatorId = this.userId;
    }
    queryParams.status = this.filterStatus;
    queryParams.priority = this.filterPriority;

    this.issueService
      .filterIssues(queryParams, page)
      .subscribe((response: IssueData) => {
        this.issueData = response;
      });
  }

  handlePageChange(page: number): void {
    this.updatePage(page - 1);
  }

  onIssueDeleted(): void {
    this.updatePage(this.issueData.number);
  }
}
