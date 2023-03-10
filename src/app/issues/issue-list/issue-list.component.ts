import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IssueData } from 'src/app/model/issuedata';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.sass'],
})
export class IssueListComponent implements OnInit {
  filterForm = {} as FormGroup;
  issueData = <IssueData>{};
  filterPriority = '';
  filterStatus = '';

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.issueData = response.issues;
    });

    this.filterForm = this.formBuilder.group({
      issuePriority: [''],
      issueStatus: [''],
    });
  }

  onSubmit(): void {
    this.filterPriority = this.filterForm.value.issuePriority;
    this.filterStatus = this.filterForm.value.issueStatus;
    this.updatePage();
  }

  updatePage(page?: number) {
    if (this.filterPriority === '' && this.filterStatus === '') {
      this.issueService.getIssues(page).subscribe((response: IssueData) => {
        this.issueData = response;
      });
    }

    if (this.filterPriority !== '' && this.filterStatus === '') {
      this.issueService
        .filterByPriority(this.filterPriority, page)
        .subscribe((response: IssueData) => {
          this.issueData = response;
        });
    }

    if (this.filterStatus !== '' && this.filterPriority === '') {
      this.issueService
        .filterByStatus(this.filterStatus, page)
        .subscribe((response: IssueData) => {
          this.issueData = response;
        });
    }

    if (this.filterStatus !== '' && this.filterPriority !== '') {
      this.issueService
        .filterByStatusAndPriority(this.filterStatus, this.filterPriority, page)
        .subscribe((response: IssueData) => {
          this.issueData = response;
        });
    }
  }

  handlePageChange(page: number) {
    this.updatePage(page - 1);
  }
}
