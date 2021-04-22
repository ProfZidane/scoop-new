import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanterManagementComponent } from './planter-management.component';

describe('PlanterManagementComponent', () => {
  let component: PlanterManagementComponent;
  let fixture: ComponentFixture<PlanterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanterManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
