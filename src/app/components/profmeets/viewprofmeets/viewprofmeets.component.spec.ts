import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofmeetsComponent } from './viewprofmeets.component';

describe('ViewprofmeetsComponent', () => {
  let component: ViewprofmeetsComponent;
  let fixture: ComponentFixture<ViewprofmeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewprofmeetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewprofmeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
