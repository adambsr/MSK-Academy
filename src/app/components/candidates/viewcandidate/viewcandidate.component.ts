import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CandidateModalComponent } from '../candidate-modal/candidate-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-viewcandidate',
  standalone: true,
  imports: [MatIconModule,
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
    CandidateModalComponent
  ],
  templateUrl: './viewcandidate.component.html',
  styleUrl: './viewcandidate.component.scss'
})
export class ViewcandidateComponent implements AfterViewInit, OnInit {
  configForm: UntypedFormGroup;

  displayedColumns: string[] = [
      'position',
      //'firstName',
      //'lastName',
      'username',
      //'password',
      //'nic',
      //'contactNumber',
      'emailAddress',
      //'birthdate',
      //'gender',
      //'address',
      //'country',
      //'state',
      //'city',
      //'facebookId',
      //'googleId',
      //'refreshToken',
      //'creationDate',
      //'isVerified',
      //'isPremium',
      //'premiumExpiry',
      //'lastConnection',
      'actions',
      'status',
  ];

  dataSource = new MatTableDataSource<CandidateElement>(ELEMENT_DATA);

  constructor(
      private router: Router,
      private dialog: MatDialog,
      private translocoService: TranslocoService,
      private _formBuilder: UntypedFormBuilder,
      private _fuseConfirmationService: FuseConfirmationService
  ) {
  }

  openCandidateModal(candidate: CandidateElement): void {
      const dialogRef = this.dialog.open(CandidateModalComponent, {
          width: '400px',
          data: { candidate: candidate },
      });
  }

  @ViewChild(MatTable) table: MatTable<CandidateElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  toggleActiveState(element: CandidateElement) {
      element.status = !element.status;
      // Optionally, trigger any additional actions here, such as updating the state in the backend.
  }

  openEditCandidatePage(element: any) {
      // Assuming `element` has an `id` property you want to pass to the edit route
      this.router.navigate(['/candidates/edit/', element.position]);
  }

  openAddCandidatePage() {
      this.router.navigate(['/candidates/add/']);
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
  options: string[] = [
      'Ahmed',
      'Adam',
      'Afra',
      'Salim',
      'Mahdoush',
      'Mahdi',
      'Wissem',
      'Youssef',
      'Kout',
      'Boussarsar',
      'Jerbi',
      'Chahed',
      'Khlif',
      'Ben Lakhel',
      'Hajbi',
      'Tutor',
      'Parent',
      'Candidate',
  ];
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
  openConfirmationDialog(element: CandidateElement): void {
      const configForm = this._formBuilder.group({
        title: this.translocoService.translate('deleteUserConfirmation.title'),
        message: this.translocoService.translate('deleteUserConfirmation.message'),
        icon: this._formBuilder.group({
          show: true,
          name: 'heroicons_outline:exclamation-triangle',
          color: 'warn',
        }),
        actions: this._formBuilder.group({
          confirmed: this._formBuilder.group({
            show: true,
            label: this.translocoService.translate('deleteUserConfirmation.actions.delete'),
            color: 'warn',
          }),
          cancel: this._formBuilder.group({
            show: true,
            label: this.translocoService.translate('deleteUserConfirmation.actions.cancel'),
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
              this.deleteData(element); // Pass the element here
          } else {
              // User canceled, do nothing or perform any other action as needed
          }
      });
  }

  deleteData(element: CandidateElement) {
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

export interface CandidateElement {
  position: number;
  firstName: string;
  lastName: string;
  username: string;
  // password: string;
  nic: number;
  emailAddress: string;
  contactNumber: number;
  birthdate: Date;
  gender: 'Male' | 'Female';
  address: string;
  country: string;
  state: string;
  city: string;
  facebookId?: string; // Optional
  googleId?: string; // Optional
  refreshToken?: string;
  creationDate?: Date;
  isVerified?: boolean;
  isPremium?: boolean;
  premiumExpiry?: Date;
  lastConnection?: Date;
  status?: boolean;
}

const ELEMENT_DATA: CandidateElement[] = [
  {
      position: 1,
      firstName: 'Ahmed',
      lastName: 'Boussarsar',
      username: 'ahmed_boussarsar',
      // password: '123',
      nic: 11164054,
      emailAddress: 'adam@gmail.com',
      contactNumber: 20843465,
      birthdate: new Date(2002, 2, 8),
      gender: 'Male',
      address: '123 Main Street',
      country: 'Country A',
      state: 'State X',
      city: 'City Y',
      facebookId: 'facebookId123',
      googleId: 'googleId123',
      refreshToken: 'refreshToken123',
      creationDate: new Date(),
      isVerified: true,
      isPremium: false,
      premiumExpiry: new Date(2025, 6, 15),
      lastConnection: new Date(2023, 5, 31),
      status: true,
  },
  {
      position: 2,
      firstName: 'Afra',
      lastName: 'Kout',
      username: 'afra_kout',
      // password: 'pass1234',
      nic: 11155522,
      emailAddress: 'afra@gmail.com',
      contactNumber: 9876543210,
      birthdate: new Date(2002, 2, 19),
      gender: 'Female',
      address: '456 Elm Street',
      country: 'Country B',
      state: 'State Y',
      city: 'City Z',
      facebookId: 'facebookId123',
      googleId: 'googleId123',
      refreshToken: 'refreshToken123',
      creationDate: new Date(),
      isVerified: true,
      isPremium: false,
      premiumExpiry: new Date(),
      lastConnection: new Date(2024, 3, 27),
      status: false,
  },
  {
      position: 3,
      firstName: 'Ahmed',
      lastName: 'Jerbi',
      username: 'ahmed_jerbi',
      // password: 'fotix',
      nic: 11223344,
      emailAddress: 'jerbi@gmail.com',
      contactNumber: 90123478,
      birthdate: new Date(2002, 11, 11),
      gender: 'Male',
      address: '123 Oak Street',
      country: 'Country A',
      state: 'State X',
      city: 'City Y',
      facebookId: 'facebookId456',
      googleId: 'googleId456',
      refreshToken: 'refreshToken456',
      creationDate: new Date(),
      isVerified: true,
      isPremium: true,
      premiumExpiry: new Date(2023, 11, 31),
      lastConnection: new Date(2021, 6, 5),
      status: true,
  },
];
