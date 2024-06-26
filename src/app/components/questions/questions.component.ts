import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicesQuestions } from 'app/Models/exercices-questions';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="question">
      <h2>{{ question.QuestionTitle }}</h2>
      <div *ngFor="let proposition of question.propositions">
        <input type="radio" [value]="proposition" name="answer" (change)="selectAnswer(proposition)">
        {{ proposition.text }}
      </div>
      <button (click)="nextQuestion()">Next</button>
    </div>
  `,
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  @Input() question: ExercicesQuestions;
  @Output() answerSelected = new EventEmitter<any>();

  selectedAnswer: any;

  selectAnswer(proposition: any) {
    this.selectedAnswer = proposition;
  }

  nextQuestion() {
    this.answerSelected.emit(this.selectedAnswer);
  }
}
