import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatTable,MatTableDataSource,MatTableModule,} from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { Config } from 'app/Config/Config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { Lessons } from 'app/Models/lessons';
import { LessonsService } from 'app/Services/lessons.service';

@Component({
    selector: 'app-viewlesson',
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
    templateUrl: './viewproflessons.component.html',
    styleUrl: './viewproflessons.component.scss',
})
export class ViewproflessonsComponent implements OnInit {
    public Config: Config = new Config();
    idUser : number = Number(localStorage.getItem("UserId"));
    idCourse : number = 0;

    displayedColumns: string[] = [
        'ID',
        'picturelesson',
        'titlelesson',
        'subtitlelesson',
        // 'descriptionlesson',
        // 'contentlesson',
        'orderlesson',
        // 'idcourse',
        'actions',
    ];

    dataSource = new MatTableDataSource<Lessons>();

    constructor(
        private router: Router,
        private LessonsService: LessonsService,
     
        private route: ActivatedRoute
    ) {
      this.route.params.subscribe((params: Params) => {
        this.idCourse = params['id'];}
    );


    }

    @ViewChild(MatTable) table: MatTable<Lessons>;
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

    openAddLessonPage() {
        this.router.navigate(['/dashboard/proflessons/add']);
    }

    openEditLesson(idLesson : number) {
        this.router.navigate(['/dashboard/proflessons/edit/'+idLesson]);
    }

    myControl = new FormControl('');
    options: string[] = ['', '', ''];
    filteredOptions: Observable<string[]>;
    Lessons: any;
    isEmptyData = false;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);

        this.fetchLessons();
    }

    fetchLessons() {
        this.LessonsService.getLessonByCourse(this.idCourse).subscribe(
            (res: any) => {
                this.Lessons = res;
                console.log(res);
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

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }

    getPictureLesson(picturelesson: string): string {
        return `${this.Config.getPhotoPath('lessons')}${picturelesson}`;
    }
}
