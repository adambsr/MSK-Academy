import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditestablishmentComponent } from './editestablishment.component';

describe('EditestablishmentComponent', () => {
  let component: EditestablishmentComponent;
  let fixture: ComponentFixture<EditestablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditestablishmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditestablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
