import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerProfilComponent } from './tracker-profil.component';

describe('TrackerProfilComponent', () => {
  let component: TrackerProfilComponent;
  let fixture: ComponentFixture<TrackerProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
