import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewExamsComponent } from './student-view-exams.component';

describe('StudentViewExamsComponent', () => {
  let component: StudentViewExamsComponent;
  let fixture: ComponentFixture<StudentViewExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
