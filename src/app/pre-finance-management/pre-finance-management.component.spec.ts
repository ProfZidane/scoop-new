import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreFinanceManagementComponent } from './pre-finance-management.component';

describe('PreFinanceManagementComponent', () => {
  let component: PreFinanceManagementComponent;
  let fixture: ComponentFixture<PreFinanceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreFinanceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreFinanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
