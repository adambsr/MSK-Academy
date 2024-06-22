import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbadgeComponent } from './viewbadge.component';

describe('ViewbadgeComponent', () => {
  let component: ViewbadgeComponent;
  let fixture: ComponentFixture<ViewbadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewbadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewbadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
