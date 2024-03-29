import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorLeaderboardsComponent } from './tutor-leaderboards.component';

describe('TutorLeaderboardsComponent', () => {
  let component: TutorLeaderboardsComponent;
  let fixture: ComponentFixture<TutorLeaderboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorLeaderboardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorLeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
