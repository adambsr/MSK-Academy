import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcandidateComponent } from './editcandidate.component';

describe('EditcandidateComponent', () => {
  let component: EditcandidateComponent;
  let fixture: ComponentFixture<EditcandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
