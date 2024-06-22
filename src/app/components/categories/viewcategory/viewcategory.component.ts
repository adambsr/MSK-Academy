import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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
import { TutorModalComponent } from 'app/components/tutors/tutor-modal/tutor-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CategoriesService } from 'app/Services/categories.service';
import { Observable, startWith, map } from 'rxjs';
import { Categories } from 'app/Models/categories';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-viewcategory',
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
    templateUrl: './viewcategory.component.html',
    styleUrl: './viewcategory.component.scss',
})
export class ViewcategoryComponent implements AfterViewInit, OnInit {
    configForm: UntypedFormGroup;

    displayedColumns: string[] = [
        'position',
        'titleEn',
        // 'titleFr',
        //'titleAr',
        'description',
        // 'categoryImage',
        //'color',
        //'type',
        //'IdParentCateg',
        'actions',
        'status',
        // 'Active',
    ];

    dataSource = new MatTableDataSource<CategoryElement>(ELEMENT_DATA);

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private translocoService: TranslocoService,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private CategoriesService : CategoriesService
    ) {}

    @ViewChild(MatTable) table: MatTable<CategoryElement>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    toggleActiveState(element: CategoryElement) {
        element.status = !element.status;
        // Optionally, trigger any additional actions here, such as updating the state in the backend.
    }

    openEditCategoryPage(element: any) {
        // Assuming `element` has an `id` property you want to pass to the edit route
        this.router.navigate(['dashboard/categories/edit/'+element.IdCateg]);
    }

    openAddCategoryPage() {
        this.router.navigate(['dashboard/categories/add']);
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
    options: string[] = ['', '', ''];
    filteredOptions: Observable<string[]>;
    Categories : any;
    isEmptyData = false;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            // map((value) => this._filter(value || ''))
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);

        this.getCtegories();
    }


    getCtegories(){

        this.CategoriesService.getCategories().subscribe(
            (res: any) => {
              this.Categories = res;
              //this.Role=res;
              console.log(res);
              if(res!="Empty" && res!=""){
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.data = res;
                this.isEmptyData = false;
              }else{
                 this.isEmptyData = true;
              }
            },
            (error: any) => {
              console.log(error);
              if (error.status == 400 || error.status == 0) {
                // Bad Request
                alert("Error Connexion Server");
              }
            }
          );

    }

    changeActive(id,active){
        //this.ToogleActive = !this.ToogleActive;
        //alert(active);
        active = ! active;
        let NumberActive: number = 0;

        (active == true)?NumberActive=1:NumberActive=0;

        this.CategoriesService.updateActiveCategory(id,NumberActive).subscribe((result: any) => {
            console.log(result);
            if (result.StatusCode == 302) {
                // duplicated
                alert('Title already exists');
            } else if (result.StatusCode == 1000) {
                if(NumberActive == 1){
                    alert('Category Number '+id+ ' Enabled');
                }else{
                    alert('Category Number '+id+ ' Disabled');
                }
                
                this.getCtegories();
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
    openConfirmationDialog(element: Categories): void {
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
                this.deleteData(element); // Pass the element here
            } else {
                // User canceled, do nothing or perform any other action as needed
            }
        });
    }

    deleteData(element: Categories) {
        // Filter the data array directly, removing the element
        console.log(element);
       

        this.CategoriesService.deleteCategory(element.IdCateg).subscribe((data : any) =>{
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

        //const filteredData = this.dataSource.data.filter((e) => e !== element);

        // Set the filtered data back to the dataSource.data
        //this.dataSource.data = filteredData;

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

export interface CategoryElement {
    position: number;
    titleEn: string;
    titleFr: string;
    titleAr: string;
    description: string;
    categoryImage: string;
    color: string;
    type: number;
    IdParentCateg: number;
    status?: boolean;
    // Active: number;
}

const ELEMENT_DATA: CategoryElement[] = [
    {
        position: 1,
        titleEn: 'Computer Science',
        titleFr: 'Computer Science',
        titleAr: 'Computer Science',
        description: 'Everything related to Computer Science',
        categoryImage: 'testtest',
        color: 'red',
        type: 1,
        IdParentCateg: 1,
        status: true,
        // Active: 1,
    },
];
