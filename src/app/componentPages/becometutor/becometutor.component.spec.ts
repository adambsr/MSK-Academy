import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecometutorComponent } from './becometutor.component';

describe('BecometutorComponent', () => {
  let component: BecometutorComponent;
  let fixture: ComponentFixture<BecometutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecometutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BecometutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
