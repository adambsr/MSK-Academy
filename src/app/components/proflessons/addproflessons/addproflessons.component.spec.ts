import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproflessonsComponent } from './addproflessons.component';

describe('AddproflessonsComponent', () => {
  let component: AddproflessonsComponent;
  let fixture: ComponentFixture<AddproflessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddproflessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddproflessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
