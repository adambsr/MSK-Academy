import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcoursesComponent } from './topcourses.component';

describe('TopcoursesComponent', () => {
  let component: TopcoursesComponent;
  let fixture: ComponentFixture<TopcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopcoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
