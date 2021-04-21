import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceManagementComponent } from './finance-management.component';

describe('FinanceManagementComponent', () => {
  let component: FinanceManagementComponent;
  let fixture: ComponentFixture<FinanceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
