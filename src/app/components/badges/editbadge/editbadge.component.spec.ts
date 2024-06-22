import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbadgeComponent } from './editbadge.component';

describe('EditbadgeComponent', () => {
  let component: EditbadgeComponent;
  let fixture: ComponentFixture<EditbadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
