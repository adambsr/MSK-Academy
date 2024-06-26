// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ExercicesService } from 'app/Services/exercices.service';

// @Component({
//   selector: 'app-exercices',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div *ngIf="!isCompleted">
//       <app-question [question]="currentQuestion" (answerSelected)="onAnswerSelected($event)"></app-question>
//     </div>
//     <div *ngIf="isCompleted">
//       <h2>Your Score: {{ score }}/{{ questions.length }}</h2>
//     </div>
//   `,
//   styleUrl: './exercices.component.scss'
// })
// export class ExercicesComponent implements OnInit {
//   questions: any[] = [];
//   currentQuestionIndex: number = 0;
//   score: number = 0;
//   isCompleted: boolean = false;

//   constructor(private exercicesService: ExercicesService) {}

//   ngOnInit() {
//     this.exercicesService.getExerciceByCourse(IdCourse).subscribe(data => {
//       this.questions = data.questions;
//       this.currentQuestion = this.questions[this.currentQuestionIndex];
//     });
//   }

//   get currentQuestion() {
//     return this.questions[this.currentQuestionIndex];
//   }

//   onAnswerSelected(answer: any) {
//     if (answer.isRight) {
//       this.score++;
//     }
//     this.currentQuestionIndex++;
//     if (this.currentQuestionIndex >= this.questions.length) {
//       this.isCompleted = true;
//     }
//   }
// }
