import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBuyingManagementComponent } from './sales-buying-management.component';

describe('SalesBuyingManagementComponent', () => {
  let component: SalesBuyingManagementComponent;
  let fixture: ComponentFixture<SalesBuyingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesBuyingManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBuyingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
