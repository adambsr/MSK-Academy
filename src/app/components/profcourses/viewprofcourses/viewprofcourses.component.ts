import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { Observable, startWith } from 'rxjs';
import { CategoriesService } from 'app/Services/categories.service';
import { CoursesService } from 'app/Services/courses.service';
import { Courses } from 'app/Models/courses';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Config } from 'app/Config/Config';

@Component({
  selector: 'app-viewprofcourses',
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
    MatSlideToggleModule,
],
  templateUrl: './viewprofcourses.component.html',
  styleUrl: './viewprofcourses.component.scss'
})
export class ViewprofcoursesComponent implements AfterViewInit, OnInit {
  configForm: UntypedFormGroup;
  idUser: number = Number(localStorage.getItem("UserId"));
  public Config: Config = new Config();

  displayedColumns: string[] = [
      'ID',
      'pictureCourse',
      'TitleCourse',
      'Subtitle',
      
      // 'titleFr',
      //'titleAr',
      'Description',
      'Duration',
      'actions',
      'status',
      //'Active',
  ];

  dataSource = new MatTableDataSource<CourseElement>(ELEMENT_DATA);

  constructor(
      private router: Router,
      private dialog: MatDialog,
      private translocoService: TranslocoService,
      private _formBuilder: UntypedFormBuilder,
      private _fuseConfirmationService: FuseConfirmationService,
      private CoursesService : CoursesService
  ) {}

  // openCategoryrModal(category: CategoryElement): void {
  //     const dialogRef = this.dialog.open(CategoryModalComponent, {
  //         width: '400px',
  //         data: { category: category },
  //     });
  // }

 

  @ViewChild(MatTable) table: MatTable<CourseElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  toggleActiveState(element: CourseElement) {
      element.status = !element.status;
      // Optionally, trigger any additional actions here, such as updating the state in the backend.
  }

  openEditCoursePage(element: any) {
      // Assuming `element` has an `id` property you want to pass to the edit route
      this.router.navigate(['dashboard/profcourses/edit/'+element.IdCourse]);
  }

  openAddCoursePage() {
      this.router.navigate(['dashboard/profcourses/Add']);
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  openLessonPage(IdCourse: number) {
    this.router.navigate(['dashboard/proflessons/view/' + IdCourse]);
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
  Courses : any;
  isEmptyData = false;

  ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          // map((value) => this._filter(value || ''))
          map((value) => (value ? this._filter(value) : []))
      );
      console.log(this.filteredOptions);

      this.getCourses();
  }

  getPictureCourse(PictureCourse: string): string {
    return this.Config.getPhotoPath('courses') + PictureCourse;
  }


  getCourses(){

      this.CoursesService.getCourseByTutor(this.idUser).subscribe(
          (res: any) => {
            this.Courses = res;
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

      this.CoursesService.updateActiveCourse(id,NumberActive).subscribe((result: any) => {
          console.log(result);
          if (result.StatusCode == 302) {
              // duplicated
              alert('Title already exists');
          } else if (result.StatusCode == 1000) {
              if(NumberActive == 1){
                  alert('Course Number '+id+ ' Enabled');
              }else{
                  alert('Course Number '+id+ ' Disabled');
              }
              
              this.getCourses();
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
  openConfirmationDialog(element: Courses): void {
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

  deleteData(element: Courses) {
      // Filter the data array directly, removing the element
      console.log(element);
     

      this.CoursesService.delete(element.IdCourse).subscribe((data : any) =>{
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

export interface CourseElement {
  position: number;
  TitleCourse: string;
  Subtitle: string;
  Description: string;
  Duration: string;
  IdCateg: string;
  
  status?: boolean;
  // Active: number;
}

const ELEMENT_DATA: CourseElement[] = [
  {
      position: 1,
      TitleCourse: 'développement web',
      Subtitle: 'Angular',
      Duration: '2',
      Description: 'Tout ce qui concerne le développement web',
      IdCateg: 'programmation',
     
  },
];
  

 
  
  


