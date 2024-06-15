import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentModalComponent } from './establishment-modal.component';

describe('EstablishmentModalComponent', () => {
  let component: EstablishmentModalComponent;
  let fixture: ComponentFixture<EstablishmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstablishmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
