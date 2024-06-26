import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycertificatesComponent } from './mycertificates.component';

describe('MycertificatesComponent', () => {
  let component: MycertificatesComponent;
  let fixture: ComponentFixture<MycertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycertificatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
