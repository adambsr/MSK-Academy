import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofmeetsComponent } from './addprofmeets.component';

describe('AddprofmeetsComponent', () => {
  let component: AddprofmeetsComponent;
  let fixture: ComponentFixture<AddprofmeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddprofmeetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddprofmeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
