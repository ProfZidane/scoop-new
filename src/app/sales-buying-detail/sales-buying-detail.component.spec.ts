import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBuyingDetailComponent } from './sales-buying-detail.component';

describe('SalesBuyingDetailComponent', () => {
  let component: SalesBuyingDetailComponent;
  let fixture: ComponentFixture<SalesBuyingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesBuyingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBuyingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
