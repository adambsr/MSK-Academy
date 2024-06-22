import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbadgeComponent } from './addbadge.component';

describe('AddbadgeComponent', () => {
  let component: AddbadgeComponent;
  let fixture: ComponentFixture<AddbadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddbadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddbadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
