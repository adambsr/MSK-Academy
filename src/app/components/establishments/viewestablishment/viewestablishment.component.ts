import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
    MatTable,
    MatTableDataSource,
    MatTableModule,
} from '@angular/material/table';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, startWith, map } from 'rxjs';
import { EstablishmentModalComponent } from '../establishment-modal/establishment-modal.component';

@Component({
    selector: 'app-viewestablishment',
    standalone: true,
    imports: [
        MatIconModule,
        MatTableModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatSortModule,
        MatAutocompleteModule,
        AsyncPipe,
        TranslocoModule,
        MatRippleModule,
        EstablishmentModalComponent,
        CommonModule,
    ],
    templateUrl: './viewestablishment.component.html',
    styleUrl: './viewestablishment.component.scss',
})
export class ViewestablishmentComponent implements AfterViewInit, OnInit {
    configForm: UntypedFormGroup;

    displayedColumns: string[] = [
        'position',
        'contactFirstName',
        //'contactLastName',
        'establishmentName',
        'establishmentType',
        //'contactNumber',
        //'emailAddress',
        'location',
        //'refreshToken',
        //'PartnershipType',
        //'PartnershipStartDate',
        //'PartnershipEndDate',
        //'IsBusinessAccount',
        //'IdentificationCardNumber',
        //'BusinessVerificationPicture',
        'actions',
        'status',
    ];

    dataSource = new MatTableDataSource<EstablishmentElement>(ELEMENT_DATA);

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private translocoService: TranslocoService,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        // this.translocoService.setActiveLang('en'); // Set the initial language
        // this.translocoService.load('en').subscribe(() => {
        //     this.translocoService.setActiveLang('en'); // Set the initial language
        // });
    }

    openEstablishmentModal(establishment: EstablishmentElement): void {
        const dialogRef = this.dialog.open(EstablishmentModalComponent, {
            width: '400px',
            data: { establishment: establishment },
        });
    }

    @ViewChild(MatTable) table: MatTable<EstablishmentElement>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    toggleActiveState(element: EstablishmentElement) {
        element.status = !element.status;
        // Optionally, trigger any additional actions here, such as updating the state in the backend.
    }

    openEditEstablishmentPage(element: any) {
        // Assuming `element` has an `id` property you want to pass to the edit route
        this.router.navigate(['/establishments/edit/', element.position]);
    }

    openAddEstablishmentPage() {
        this.router.navigate(['/establishments/add/']);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        console.log(this.dataSource.data);

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    myControl = new FormControl('');
    options: string[] = ['College', 'University', 'School', 'Training Center'];
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            // map((value) => this._filter(value || ''))
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);
    }

    // Open confirmation dialog
    openConfirmationDialog(element: EstablishmentElement): void {
        const configForm = this._formBuilder.group({
            title: this.translocoService.translate(
                'deleteUserConfirmation.title'
            ),
            message: this.translocoService.translate(
                'deleteUserConfirmation.message'
            ),
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirmed: this._formBuilder.group({
                    show: true,
                    label: this.translocoService.translate(
                        'deleteUserConfirmation.actions.delete'
                    ),
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: this.translocoService.translate(
                        'deleteUserConfirmation.actions.cancel'
                    ),
                }),
            }),
            dismissible: true,
        });

        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(configForm.value);

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            // Check the result and perform the appropriate action
            if (result === 'confirmed') {
                // User confirmed, perform delete action
                this.deleteData(element);
            } else {
                // User canceled, do nothing or perform any other action as needed
            }
        });
    }

    deleteData(element: EstablishmentElement) {
        // Filter the data array directly, removing the element
        console.log(element);
        const filteredData = this.dataSource.data.filter((e) => e !== element);

        // Set the filtered data back to the dataSource.data
        this.dataSource.data = filteredData;

        // Update pagination
        if (this.paginator) {
            this.paginator.length = this.dataSource.data.length;
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }
}

export interface EstablishmentElement {
    position: number;
    contactFirstName: string;
    contactLastName: string;
    establishmentName: string;
    establishmentType: 'Training Center' | 'School' | 'College' | 'University';
    emailAddress: string;
    contactNumber: number;
    location: string;
    PartnershipType: 'Strategic' | 'Operational' | 'Tactical' | 'Supplier';
    PartnershipStartDate: Date;
    PartnershipEndDate: Date;
    IsBusinessAccount: boolean;
    nic: number;
    BusinessVerificationPicture: string;
    status?: boolean;
}

const ELEMENT_DATA: EstablishmentElement[] = [
    {
        position: 1,
        contactFirstName: 'Jane',
        contactLastName: 'Doe',
        establishmentName: 'Global Tech University',
        establishmentType: 'University',
        emailAddress: 'contact@globaltechu.edu',
        contactNumber: 1234567890,
        location: 'America',
        PartnershipType: 'Strategic',
        PartnershipStartDate: new Date(2022, 0, 1), // January 1, 2022
        PartnershipEndDate: new Date(2025, 11, 31), // December 31, 2025
        IsBusinessAccount: true,
        nic: 987654321,
        BusinessVerificationPicture:
            'https://example.com/path/to/verification/picture.jpg',
        status: true,
    },
    {
        position: 2,
        contactFirstName: 'Mohamed',
        contactLastName: 'Ali',
        establishmentName: 'Innovative Minds Training Center',
        establishmentType: 'Training Center',
        emailAddress: 'info@innovativemindstc.com',
        contactNumber: 9876543210,
        location: 'Tunisia',
        PartnershipType: 'Operational',
        PartnershipStartDate: new Date(2023, 3, 15), // April 15, 2023
        PartnershipEndDate: new Date(2026, 2, 14), // March 14, 2026
        IsBusinessAccount: false,
        nic: 123456789,
        BusinessVerificationPicture:
            'https://example.com/path/to/another/verification/picture.png',
        status: false,
    },
];
