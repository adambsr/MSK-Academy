import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, Time } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
    MatTable,
    MatTableDataSource,
    MatTableModule,
} from '@angular/material/table';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Observable, startWith, map } from 'rxjs';
import { MeetsService } from 'app/Services/meets.service';

@Component({
    selector: 'app-mymeets',
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
    templateUrl: './mymeets.component.html',
    styleUrl: './mymeets.component.scss',
})
export class MymeetsComponent implements AfterViewInit, OnInit {

    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();

    idCourse: number;

    displayedColumns: string[] = [
        // 'position',
        'pictureCourse',
        'titlemeet',
        'linkmeet',
        'datemeet',
        // 'titletutor',
        // 'starttime',
        // 'duration',
        // 'actions',
    ];

    dataSource = new MatTableDataSource<MeetsElement>(ELEMENT_DATA);

    constructor(
        private router: Router,
        private translocoService: TranslocoService,
        private MeetsService: MeetsService,
        private route: ActivatedRoute
    ) {

        this.route.params.subscribe((params: Params) => {
            this.idCourse = params['idCourse'];
        }
        );
    }

    @ViewChild(MatTable) table: MatTable<MeetsElement>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    openMeetPage(element: any) {
        this.router.navigate(['/meets/' + element.IdMeet]);
    }

    openMeetLink(link: string) {
        //this.router.navigate(['/meets/' + element.IdMeet]);
        window.open(link, "_blank");
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
    Meets: any;
    isEmptyData = false;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);
        this.dataSource = new MatTableDataSource<MeetsElement>(this.Meets);
        this.getMeets();
    }

    getPictureCourse(PictureCourse: string): string {
        return this.Config.getPhotoPath('courses') + PictureCourse;
    }

    getMeets() {
        this.MeetsService.getMeetsByCourse(this.idCourse).subscribe(
            (res: any) => {
                this.Meets = res;
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

    reconvertword(str: string): string {
        return this.Config.Reconvertword(str);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }
}

export interface MeetsElement {
    position: number;
    titlemeet: string;
    linkmeet: string;
    datemeet: string;
    titlecourse: string;
    titletutor: string;
    starttime: string;
    duration: string;
}

const ELEMENT_DATA: MeetsElement[] = [
    {
        position: 1,
        titlemeet: 'Meeting 1',
        linkmeet: 'https://example.com/meeting1',
        datemeet: '2024-05-09',
        titlecourse: 'test',
        titletutor: 'test',
        starttime: '10:00',
        duration: '2 hours',
    },
];
