import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofmeetsComponent } from './editprofmeets.component';

describe('EditprofmeetsComponent', () => {
  let component: EditprofmeetsComponent;
  let fixture: ComponentFixture<EditprofmeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditprofmeetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditprofmeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
