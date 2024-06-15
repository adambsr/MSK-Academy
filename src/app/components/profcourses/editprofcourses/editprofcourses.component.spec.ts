import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofcoursesComponent } from './editprofcourses.component';

describe('EditprofcoursesComponent', () => {
  let component: EditprofcoursesComponent;
  let fixture: ComponentFixture<EditprofcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditprofcoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditprofcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
