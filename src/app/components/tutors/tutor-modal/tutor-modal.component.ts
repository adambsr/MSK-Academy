import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { TutorElement } from '../viewtutor/viewtutor.component';

@Component({
    selector: 'app-tutor-modal',
    standalone: true,
    imports: [TranslocoModule, MatDialogModule, CommonModule],
    templateUrl: './tutor-modal.component.html',
    styleUrl: './tutor-modal.component.scss',
})
export class TutorModalComponent implements OnInit {
    @Input() tutor: TutorElement;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private translocoService: TranslocoService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.tutor = this.data.tutor;
    }
}
