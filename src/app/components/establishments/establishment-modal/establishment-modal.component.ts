import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatDialogModule,
    MAT_DIALOG_DATA,
    MatDialog,
} from '@angular/material/dialog';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { EstablishmentElement } from '../viewestablishment/viewestablishment.component';

@Component({
    selector: 'app-establishment-modal',
    standalone: true,
    imports: [TranslocoModule, MatDialogModule, CommonModule],
    templateUrl: './establishment-modal.component.html',
    styleUrl: './establishment-modal.component.scss',
})
export class EstablishmentModalComponent implements OnInit {
    @Input() establishment: EstablishmentElement;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private translocoService: TranslocoService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.establishment = this.data.establishment;
    }
}
