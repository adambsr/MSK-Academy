import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorModalComponent } from './tutor-modal.component';

describe('TutorModalComponent', () => {
  let component: TutorModalComponent;
  let fixture: ComponentFixture<TutorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
