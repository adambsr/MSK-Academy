import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
    MatTable,
    MatTableDataSource,
    MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder } from '@angular/forms';
import { Config } from 'app/Config/Config';
import { UsersService } from 'app/Services/users.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Users } from 'app/Models/users';

@Component({
    selector: 'app-viewuser',
    standalone: true,
    templateUrl: './viewuser.component.html',
    styleUrl: './viewuser.component.scss',
    imports: [CommonModule,MatIconModule,MatTableModule,FormsModule,MatFormFieldModule,NgClass, MatInputModule,TextFieldModule,ReactiveFormsModule,MatButtonToggleModule,MatButtonModule,MatSelectModule,MatOptionModule,MatChipsModule,MatDatepickerModule,MatPaginatorModule,MatSortModule,MatAutocompleteModule,AsyncPipe,TranslocoModule,MatRippleModule,UserModalComponent,MatSlideToggleModule,
    ],
})
export class ViewuserComponent implements AfterViewInit, OnInit {
    configForm: UntypedFormGroup;

    displayedColumns: string[] = [
        'ID','firstName','lastName','emailAddress','role','actions','status',
    ];

    id: number;
    isPageActive = 1;
    NbrPages : number = 1;
    NbrPages2: number = 1; 
    Rech : string = 'null';

    isEmpty: boolean=true;   // modal
    isEmptyData: boolean = true;
    
    public Config: Config = new Config;
    APIUrl : string = this.Config.getAPIPath();

    photoName: string = "anonymous.jpg";
    image : string =this.Config.getPhotoPath("users");
    photo: string = this.image+ this.photoName;

    dataSource = new MatTableDataSource<Users>();

    constructor(
        private router : Router,
        private userService : UsersService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private translocoService: TranslocoService,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.route.params.subscribe((Params: Params) => {
            this.id = Params['id'];
          });
    }

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            // map((value) => this._filter(value || ''))
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);
        this.getUsers();
    }

    getUsers(){
        this.userService.getUsers().subscribe((data : any) =>{
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
                
                this.getUsers();
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


    openUserModal(user: Users): void {
        const dialogRef = this.dialog.open(UserModalComponent, {
            width: '400px',
            data: { user: user },
        });
    }

    @ViewChild(MatTable) table: MatTable<Users>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    openEditUserPage(element: any) {
        // Assuming `element` has an `id` property you want to pass to the edit route
        this.router.navigate(['dashboard/users/edit/', element.Id]);
    }

    openAddUserPage() {
        this.router.navigate(['dashboard/users/add/']);
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
    options: string[] = [];
    
    filteredOptions: Observable<string[]>;

   
    // Open confirmation dialog
    openConfirmationDialog(element: Users): void {
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
                this.deleteData(element);
            } else {
                // User canceled, do nothing or perform any other action as needed
            }
        });
    }

    deleteData(element: Users) {
        // Call the backend to delete the user
        this.userService.deleteUser(element.IdUser).subscribe({
            next: (response) => {
                // Remove the user from the dataSource.data array
                this.dataSource.data = this.dataSource.data.filter(e => e.IdUser !== element.IdUser);
    
                // Inform MatTable about the update
                this.table.renderRows();
    
                // Optionally, refresh the list to fetch updated data from the server
                // this.getUsers();
            },
            error: (error) => {
                console.error('Error deleting the user:', error);
                alert("Error when trying to delete the user.");
            }
        });
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }
}
