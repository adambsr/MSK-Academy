import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcertificateComponent } from './editcertificate.component';

describe('EditcertificateComponent', () => {
  let component: EditcertificateComponent;
  let fixture: ComponentFixture<EditcertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcertificateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
