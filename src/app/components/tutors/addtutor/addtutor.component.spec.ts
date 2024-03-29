import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtutorComponent } from './addtutor.component';

describe('AddtutorComponent', () => {
  let component: AddtutorComponent;
  let fixture: ComponentFixture<AddtutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
