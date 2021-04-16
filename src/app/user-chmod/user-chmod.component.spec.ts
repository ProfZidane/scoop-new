import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChmodComponent } from './user-chmod.component';

describe('UserChmodComponent', () => {
  let component: UserChmodComponent;
  let fixture: ComponentFixture<UserChmodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChmodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
