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
import { TutorModalComponent } from '../tutor-modal/tutor-modal.component';
import { UsersService } from 'app/Services/users.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-viewtutor',
    standalone: true,
    imports: [
        CommonModule,
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
        TutorModalComponent,
        MatSlideToggleModule,
    ],
    templateUrl: './viewtutor.component.html',
    styleUrl: './viewtutor.component.scss',
})
export class ViewtutorComponent implements AfterViewInit, OnInit {
    configForm: UntypedFormGroup;

    displayedColumns: string[] = [
        'ID',
        'firstName',
        'lastName',
        //'username',
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
        //'isBusiness',
        //'teachingExperience',
        'speciality',
        'qualifications',
        'actions',
        'status',
    ];

    //dataSource = new MatTableDataSource<TutorElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource<TutorElement>();
    isEmptyData: boolean= true;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private translocoService: TranslocoService,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private userService : UsersService,
    ) {}

    openTutorModal(tutor: TutorElement): void {
        const dialogRef = this.dialog.open(TutorModalComponent, {
            width: '400px',
            data: { tutor: tutor },
        });
    }

    @ViewChild(MatTable) table: MatTable<TutorElement>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    toggleActiveState(element: TutorElement) {
        element.status = !element.status;
        // Optionally, trigger any additional actions here, such as updating the state in the backend.
    }

    openEditTutorPage(element: any) {
        // Assuming `element` has an `id` property you want to pass to the edit route
        this.router.navigate(['/tutors/edit/', element.position]);
    }

    openAddTutorPage() {
        this.router.navigate(['/tutors/add/']);
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
    options: string[] = ['Ahmed', 'Adam', 'Afra'];
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            // map((value) => this._filter(value || ''))
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);

       this.getTutors();
    }


    getTutors(){
        this.userService.getTutors().subscribe((data : any) =>{
            //this.languages=data;
            console.log(data);
            if(data!="Empty" && data!=""){
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.data = data;
              this.isEmptyData = false;
            }else{
               this.isEmptyData = true;
            }
            //this.dataSource.paginator = this.paginator;
            //this.dataSource.sort = this.sort;
       
          }),(error: any) => {
            console.log(error);
            if(error.status == 400 || error.status == 0 || error.status == 401 || error.status == 403){
              alert("Error Connexion Server ou session");
            }else{
              alert("Error "+error.status);
            };
          }
    }

    changeActive(id,active){
        //this.ToogleActive = !this.ToogleActive;
        alert(id+" "+active);
        active = ! active;
        let NumberActive: number = 0;

        (active == true)?NumberActive=1:NumberActive=0;

        this.userService.updateActiveUser(id,NumberActive).subscribe((result: any) => {
            console.log(result);
            if (result.StatusCode == 302) {
                // duplicated
                alert('Title already exists');
            } else if (result.StatusCode == 1000) {
                if(NumberActive == 1){
                    alert('User Number '+id+ ' Enabled');
                }else{
                    alert('User Number '+id+ ' Disabled');
                }
                
                this.getTutors();
                //this.Router.navigateByUrl('dashboard/categories/view/1');
            } else {
                alert(result.StatusCode);
            }
        }),
            (errors: any) => {
                console.log(errors);
                if (
                    errors.status == 400 ||
                    errors.status == 0 ||
                    errors.status == 404 ||
                    errors.status == 403
                ) {
                    // Bad Request Unauthorized
                    alert('Error Connexion Server or Session');
                }
        };
    }

    // Open confirmation dialog
    openConfirmationDialog(element: TutorElement): void {
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

    deleteData(element: TutorElement) {
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

export interface TutorElement {
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
    facebookId: string; 
    googleId: string; 
    refreshToken: string;
    creationDate: Date;
    isVerified: boolean;
    isPremium: boolean;
    premiumExpiry?: Date;
    lastConnection?: Date;
    status?: boolean;
    isBusiness: boolean;
    teachingExperience: string;
    speciality: string;
    qualifications: string;
}

const ELEMENT_DATA: TutorElement[] = [
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
        isBusiness: true,
        teachingExperience: 'University professor',
        speciality: 'Computer science',
        qualifications: 'PHD and other certificates',
    },
];
