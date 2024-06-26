import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Exercice } from 'app/Models/exercices';
import { ExercicesService } from 'app/Services/exercices.service';
import { MatDialog } from '@angular/material/dialog';
import { ScoreDialogComponent } from '../score-dialog/score-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {
  exercice: Exercice | null = null;
  currentQuestionIndex = 0;
  selectedPropositionId: number | null = null;
  selectedPropositions: { IdQuestion: number, IdProposition: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private exerciceService: ExercicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const idCourse = params['id'];
      if (idCourse) {
        this.fetchQuiz(idCourse);
      }
    });
  }

  fetchQuiz(idCourse: number): void {
    this.exerciceService.getExerciceByCourse(idCourse).subscribe(
      (resExercice: any) => {
        this.exercice = resExercice.Exercice;
        console.log(this.exercice);
      },
      (error) => {
        console.log('Error fetching exercice:', error);
      }
    );
  }

  nextQuestion(): void {
    if (this.exercice && this.currentQuestionIndex < this.exercice.Questions.length - 1) {
      const question = this.exercice.Questions[this.currentQuestionIndex];
      const propositionId = this.selectedPropositionId;
      if (propositionId !== null && propositionId !== undefined) {
        this.selectedPropositions.push({ IdQuestion: question.IdQuestion, IdProposition: propositionId });
      }
      console.log(this.selectedPropositions);
      this.currentQuestionIndex++;
      this.selectedPropositionId = null;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedPropositionId = null;
    }
  }

  submitQuiz(): void {
    if (this.exercice) {
      const question = this.exercice.Questions[this.currentQuestionIndex];
      const propositionId = this.selectedPropositionId;
      if (propositionId !== null && propositionId !== undefined) {
        this.selectedPropositions.push({ IdQuestion: question.IdQuestion, IdProposition: propositionId });
      }
      
      this.exerciceService.result(this.selectedPropositions).subscribe(
        (score: any) => {
          console.log('Score:', score.Score);
          this.openScoreDialog(score.Score);
          this.selectedPropositions = [];
        },
        (error) => {
          console.log('Error giving score:', error);
        }
      );

    }
  }

  openScoreDialog(score: number): void {
    this.dialog.open(ScoreDialogComponent, {
      width: '400px',
      data: { score: score }
    });
  }

  onPropositionSelect(propositionId: number): void {
    this.selectedPropositionId = propositionId;
  }
}
