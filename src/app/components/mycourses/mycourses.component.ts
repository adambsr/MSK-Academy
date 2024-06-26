import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import {FormControl,FormsModule,ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable,MatTableDataSource,MatTableModule} from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { CoursesService } from 'app/Services/courses.service';
import { Config } from 'app/Config/Config';
import { Courses } from 'app/Models/courses';
import { LessonsService } from 'app/Services/lessons.service';

@Component({
    selector: 'app-mycourses',
    standalone: true,
    imports: [CommonModule,MatIconModule,MatTableModule,FormsModule,MatFormFieldModule,NgClass,MatInputModule,TextFieldModule,ReactiveFormsModule,MatButtonToggleModule,MatButtonModule,MatSelectModule,MatOptionModule,MatChipsModule,MatDatepickerModule,MatPaginatorModule,MatSortModule,MatAutocompleteModule,AsyncPipe,TranslocoModule,MatRippleModule,MatSlideToggleModule],
    templateUrl: './mycourses.component.html',
    styleUrl: './mycourses.component.scss',
})
export class MycoursesComponent implements OnInit {
    public Config: Config = new Config();
    idUser : number = Number(localStorage.getItem("UserId"));
  

    displayedColumns: string[] = [
        'picturecourse',
        'titlecourse',
        // 'subtitle',
        // 'description',
        'duration',
        'progress',
        'actions',
    ];

    dataSource = new MatTableDataSource<any>();

    constructor(private router: Router,private CoursesService: CoursesService, private LessonsService: LessonsService
    ) { }

    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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

    openMeetsPage(IdCourse: number) {
        this.router.navigate(['/dashboard/mymeets/view/' + IdCourse]);
    }


    openCoursePage(IdCourse: number) {
        this.router.navigate(['/dashboard/academy/' + IdCourse]);
    }

    openCertificatPage(IdCourse: number, IdTutor: number) {
        this.router.navigate(['printCertificate/' +  IdCourse + '/'+IdTutor]);
    }

    myControl = new FormControl('');
    options: string[] = ['', '', ''];
    filteredOptions: Observable<string[]>;
    Courses: any;
    allLessons: any;
    allCourses : any;
    isEmptyData = false;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);

        this.getAllcourses();
    }

    getAllcourses() {
        this.CoursesService.getEnrolledCourseByCandidate(this.idUser).subscribe(
            (res: any) => {

                console.log(res);
                this.allLessons = res;
                this.Courses = res;

                //this.processArrayWithoutDuplicates(this.allLessons);

                // fetch all lesson to show just the not deplicated Course
                let seenCourses = new Set<number>();
 

                console.log(this.Courses);

                //this.Courses = res;
                
                if (res != 'Empty' && res != '') {
                    this.dataSource = new MatTableDataSource(res);
                    this.dataSource.data = res;
                    this.isEmptyData = false;
                } else {
                    this.isEmptyData = true;
                }
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error Connexion Server');
                }
            }
        );
    }

     processArrayWithoutDuplicates(arr: any[]): void {
        let seenElements = new Set<any>();
      
        for (let element of arr) {
          if (!seenElements.has(element.IdCourse)) {
            // Process the unique element (e.g., print it)
            console.log(element);
            
            // Add the element to the set to mark it as seen
            seenElements.add(element);
          }
        }
        this.Courses = seenElements;
        console.log(this.Courses);
      }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }

    getPictureCourse(picturecourse: string): string {
        return `${this.Config.getPhotoPath('courses')}${picturecourse}`;
    }

    // boucle infini
    getProgressionCourse(idCourse : number) : number {
        let n : number = 0;
        this.LessonsService.getLessonByCourse(idCourse).subscribe(
            (resLesson: any) => {
                console.log(resLesson);
                n = resLesson.length;
 
            },
            (error) => {
                console.log("Error getLessonByCourse " +  idCourse);
                console.error(error);
            }
          );
          return n ;
    }

    setProgress(progress: number, idCourse: number): void {
        console.log(progress);
        //console.log(idCourse);
        let progressBar = document.getElementById('progress-bar'+idCourse) as HTMLDivElement;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            progressBar.innerHTML = `${progress}%`;
        } else {
            console.error(`Element with ID progress-bar${idCourse} not found.`);
        } 

        progressBar.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-red-500');
        if (progress < 30) {
          progressBar.classList.add('bg-red-500');
        } else if (progress < 70) {
          progressBar.classList.add('bg-yellow-500');
        } else {
          progressBar.classList.add('bg-green-500');
        }
      }
      
      // Example usage: dynamically update progress
    //    progress = 0;
    //   const interval = setInterval(() => {
    //     if (this.progress >= 100) {
    //       clearInterval(interval);
    //     } else {
    //       progress += 10;
    //       setProgress(progress);
    //     }
    //   }, 1000); // Update progress every second
     
}
