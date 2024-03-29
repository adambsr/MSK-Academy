import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittutorComponent } from './edittutor.component';

describe('EdittutorComponent', () => {
  let component: EdittutorComponent;
  let fixture: ComponentFixture<EdittutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdittutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdittutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
