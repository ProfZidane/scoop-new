import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanterProfilComponent } from './planter-profil.component';

describe('PlanterProfilComponent', () => {
  let component: PlanterProfilComponent;
  let fixture: ComponentFixture<PlanterProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanterProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
