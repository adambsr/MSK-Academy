import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstsearchComponent } from './firstsearch.component';

describe('FirstsearchComponent', () => {
  let component: FirstsearchComponent;
  let fixture: ComponentFixture<FirstsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstsearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
