import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteManagementComponent } from './vente-management.component';

describe('VenteManagementComponent', () => {
  let component: VenteManagementComponent;
  let fixture: ComponentFixture<VenteManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
