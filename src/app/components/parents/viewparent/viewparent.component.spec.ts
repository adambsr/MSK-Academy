import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewparentComponent } from './viewparent.component';

describe('ViewparentComponent', () => {
  let component: ViewparentComponent;
  let fixture: ComponentFixture<ViewparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewparentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
