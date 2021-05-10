import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetScoresComponent } from './set-scores.component';

describe('SetScoresComponent', () => {
  let component: SetScoresComponent;
  let fixture: ComponentFixture<SetScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
