import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseIssueComponent } from './close-issue.component';

describe('CloseIssueComponent', () => {
  let component: CloseIssueComponent;
  let fixture: ComponentFixture<CloseIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
