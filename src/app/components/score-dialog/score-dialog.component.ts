import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone:true,
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.scss'],
  imports: [MatDialogModule],
})
export class ScoreDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { score: number },
    public dialogRef: MatDialogRef<ScoreDialogComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
