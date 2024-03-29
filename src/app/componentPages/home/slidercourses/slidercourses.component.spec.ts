import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidercoursesComponent } from './slidercourses.component';

describe('SlidercoursesComponent', () => {
  let component: SlidercoursesComponent;
  let fixture: ComponentFixture<SlidercoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidercoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlidercoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
