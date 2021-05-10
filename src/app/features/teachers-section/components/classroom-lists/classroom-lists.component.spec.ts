import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClassroomListsComponent } from "./classroom-lists.component";

describe("ClassroomListsComponent", () => {
  let component: ClassroomListsComponent;
  let fixture: ComponentFixture<ClassroomListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomListsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
