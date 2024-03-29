import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CandidateElement } from '../viewcandidate/viewcandidate.component';

@Component({
    selector: 'app-candidate-modal',
    standalone: true,
    imports: [TranslocoModule, MatDialogModule, CommonModule],
    templateUrl: './candidate-modal.component.html',
    styleUrl: './candidate-modal.component.scss',
})
export class CandidateModalComponent implements OnInit {
    @Input() candidate: CandidateElement;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private translocoService: TranslocoService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.candidate = this.data.candidate;
    }
}
