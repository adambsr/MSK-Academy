import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofcoursesComponent } from './addprofcourses.component';

describe('AddprofcoursesComponent', () => {
  let component: AddprofcoursesComponent;
  let fixture: ComponentFixture<AddprofcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddprofcoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddprofcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
