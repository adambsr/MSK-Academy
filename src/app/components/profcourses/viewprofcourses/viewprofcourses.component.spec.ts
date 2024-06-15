import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofcoursesComponent } from './viewprofcourses.component';

describe('ViewprofcoursesComponent', () => {
  let component: ViewprofcoursesComponent;
  let fixture: ComponentFixture<ViewprofcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewprofcoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewprofcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
