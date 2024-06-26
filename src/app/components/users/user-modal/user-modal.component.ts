import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { UserElement } from '../viewuser/viewuser.component';

@Component({
    selector: 'app-user-modal',
    standalone: true,
    imports: [TranslocoModule, MatDialogModule, CommonModule],
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
    @Input() user: UserElement;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private translocoService: TranslocoService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.user = this.data.user;
    }
}
