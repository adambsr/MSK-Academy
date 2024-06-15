import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproflessonsComponent } from './viewproflessons.component';

describe('ViewproflessonsComponent', () => {
  let component: ViewproflessonsComponent;
  let fixture: ComponentFixture<ViewproflessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewproflessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewproflessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
