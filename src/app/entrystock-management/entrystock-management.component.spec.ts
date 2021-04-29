import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrystockManagementComponent } from './entrystock-management.component';

describe('EntrystockManagementComponent', () => {
  let component: EntrystockManagementComponent;
  let fixture: ComponentFixture<EntrystockManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrystockManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrystockManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
