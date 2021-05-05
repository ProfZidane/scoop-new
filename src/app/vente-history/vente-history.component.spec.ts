import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteHistoryComponent } from './vente-history.component';

describe('VenteHistoryComponent', () => {
  let component: VenteHistoryComponent;
  let fixture: ComponentFixture<VenteHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenteHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
