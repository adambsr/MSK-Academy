import { Question } from "./question";

export interface Exercice {
    IdExercice: number;
    ExerciceTitle: string;
    ExerciceDescription: string;
    Grade: number;
    Questions: Question[];
  }