import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewestablishmentComponent } from './viewestablishment.component';

describe('ViewestablishmentComponent', () => {
  let component: ViewestablishmentComponent;
  let fixture: ComponentFixture<ViewestablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewestablishmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewestablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
