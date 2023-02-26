import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Issue } from 'src/app/interfaces/issue';
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
    const filterPriority = this.filterForm.value.issuePriority;
    const filterStatus = this.filterForm.value.issueStatus;

    if (filterPriority === '' && filterStatus === '') {
      this.issueService.getIssues().subscribe((response: IssueData) => {
        this.issueData = response;
      });
    }

    if (filterPriority !== '' && filterStatus === '') {
      this.issueService
        .filterByPriority(filterPriority)
        .subscribe((response: IssueData) => {
          this.issueData = response;
        });
    }

    if (filterStatus !== '' && filterPriority === '') {
      this.issueService
        .filterByStatus(filterStatus)
        .subscribe((response: IssueData) => {
          this.issueData = response;
        });
    }

    if (filterStatus !== '' && filterPriority !== '') {
      this.issueService
        .filterByStatusAndPriority(filterStatus, filterPriority)
        .subscribe((response: IssueData) => {
          this.issueData = response;
        });
    }
  }

  handlePageChange(page: number) {
    this.issueService.getIssues(page).subscribe((response: IssueData) => {
      this.issueData = response;
    });
  }
}
