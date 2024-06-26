import { Proposition } from "./propositions";

export interface Question {
    IdQuestion: number;
    QuestionTitle: string;
    QuestionContent: string;
    Propositions: Proposition[];
  }
