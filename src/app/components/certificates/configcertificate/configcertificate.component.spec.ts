import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigcertificateComponent } from './configcertificate.component';

describe('ConfigcertificateComponent', () => {
  let component: ConfigcertificateComponent;
  let fixture: ComponentFixture<ConfigcertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigcertificateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
