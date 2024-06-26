import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybadgesComponent } from './mybadges.component';

describe('MybadgesComponent', () => {
  let component: MybadgesComponent;
  let fixture: ComponentFixture<MybadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybadgesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MybadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
