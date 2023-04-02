import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMgmtComponent } from './profile-mgmt.component';

describe('ProfileMgmtComponent', () => {
  let component: ProfileMgmtComponent;
  let fixture: ComponentFixture<ProfileMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
