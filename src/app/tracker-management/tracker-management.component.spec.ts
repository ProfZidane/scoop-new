import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerManagementComponent } from './tracker-management.component';

describe('TrackerManagementComponent', () => {
  let component: TrackerManagementComponent;
  let fixture: ComponentFixture<TrackerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
