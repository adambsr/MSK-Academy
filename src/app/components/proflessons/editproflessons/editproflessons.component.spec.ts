import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproflessonsComponent } from './editproflessons.component';

describe('EditproflessonsComponent', () => {
  let component: EditproflessonsComponent;
  let fixture: ComponentFixture<EditproflessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditproflessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditproflessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
