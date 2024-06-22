import { TestBed } from '@angular/core/testing';

import { ExercicesQuestionsService } from './exercices-questions.service';

describe('ExercicesQuestionsService', () => {
  let service: ExercicesQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercicesQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
