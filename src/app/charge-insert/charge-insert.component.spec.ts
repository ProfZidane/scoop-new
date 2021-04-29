import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeInsertComponent } from './charge-insert.component';

describe('ChargeInsertComponent', () => {
  let component: ChargeInsertComponent;
  let fixture: ComponentFixture<ChargeInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
