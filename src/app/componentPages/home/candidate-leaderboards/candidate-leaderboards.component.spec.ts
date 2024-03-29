import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateLeaderboardsComponent } from './candidate-leaderboards.component';

describe('CandidateLeaderboardsComponent', () => {
  let component: CandidateLeaderboardsComponent;
  let fixture: ComponentFixture<CandidateLeaderboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateLeaderboardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateLeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
