import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcandidateComponent } from './viewcandidate.component';

describe('ViewcandidateComponent', () => {
  let component: ViewcandidateComponent;
  let fixture: ComponentFixture<ViewcandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewcandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
