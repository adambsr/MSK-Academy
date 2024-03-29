import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditparentComponent } from './editparent.component';

describe('EditparentComponent', () => {
  let component: EditparentComponent;
  let fixture: ComponentFixture<EditparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditparentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
