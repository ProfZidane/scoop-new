import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeModificationComponent } from './charge-modification.component';

describe('ChargeModificationComponent', () => {
  let component: ChargeModificationComponent;
  let fixture: ComponentFixture<ChargeModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
