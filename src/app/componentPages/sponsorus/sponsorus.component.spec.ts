import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorusComponent } from './sponsorus.component';

describe('SponsorusComponent', () => {
  let component: SponsorusComponent;
  let fixture: ComponentFixture<SponsorusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsorusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
