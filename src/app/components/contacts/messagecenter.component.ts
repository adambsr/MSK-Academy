import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
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
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, map, startWith } from 'rxjs';
import { MessagesService } from 'app/Services/messages.service';
import { Messages } from 'app/Models/messages';
import { Config } from 'app/Config/Config';

@Component({
    selector: 'app-messagecenter',
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
    ],
    templateUrl: './messagecenter.component.html',
    styleUrl: './messagecenter.component.scss',
})
export class MessagecenterComponent implements AfterViewInit, OnInit {
    public Config: Config = new Config();

    APIUrl: string = this.Config.getAPIPath();

    displayedColumns: string[] = [
        'position',
        'username',
        'email',
        'subject',
        'message',
        'dateMessage',
        'actions',
    ];

    dataSource = new MatTableDataSource<Messages>();

    constructor(
        private MessagesService: MessagesService,
        private router: Router,
        private translocoService: TranslocoService,
        private formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    ) { }

    @ViewChild(MatTable) table: MatTable<Messages>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    myControl = new FormControl('');
    options: string[] = ['', '', ''];
    filteredOptions: Observable<any[]>;
    messages: any;
    isEmptyData = false;

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => (value ? this._filter(value) : []))
        );
        console.log(this.filteredOptions);
        this.dataSource = new MatTableDataSource<Messages>();
        this.getMessages();
    }

    getMessages() {
        this.MessagesService.getMessages().subscribe(
            (res: any) => {
                this.messages = res;
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

    openReplyPage(element: any) {
        this.router.navigate(['/contacts/reply/', element.IdMessage]);
    }

    // Open confirmation dialog
    openConfirmationDialog(message: Messages): void {
        const configForm = this.formBuilder.group({
            title: this.translocoService.translate(
                'deleteUserConfirmation.title'
            ),
            message: this.translocoService.translate(
                'deleteUserConfirmation.message'
            ),
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            }),
            actions: this.formBuilder.group({
                confirmed: this.formBuilder.group({
                    show: true,
                    label: this.translocoService.translate(
                        'deleteUserConfirmation.actions.delete'
                    ),
                    color: 'warn',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    label: this.translocoService.translate(
                        'deleteUserConfirmation.actions.cancel'
                    ),
                }),
            }),
            dismissible: true,
        });

        const dialogRef = this._fuseConfirmationService.open(configForm.value);

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.deleteMessage(message);
            } else {
                // User canceled, do nothing or perform any other action as needed
            }
        });
    }

    deleteMessage(message: Messages): void {
        // Filter the data array directly, removing the element
        console.log(message);

        this.MessagesService.deleteMessage(message.IdMessage).subscribe(
            (data: any) => {
                //this.languages=data;
                console.log(data);
                if (data != 'Empty' && data != '') {
                    this.dataSource = new MatTableDataSource(data);
                    this.dataSource.data = data;
                    this.isEmptyData = false;
                } else {
                    this.isEmptyData = true;
                }
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        ),
            (error: any) => {
                console.log(error);
                if (
                    error.status == 400 ||
                    error.status == 0 ||
                    error.status == 401 ||
                    error.status == 403
                ) {
                    alert('Error Connexion Server ou session');
                } else {
                    alert('Error ' + error.status);
                }
            };

        //const filteredData = this.dataSource.data.filter((e) => e !== element);

        // Set the filtered data back to the dataSource.data
        //this.dataSource.data = filteredData;

        // Update pagination
        if (this.paginator) {
            this.paginator.length = this.dataSource.data.length;
        }
    }

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.messages.filter(
            (message) =>
                message.Username.toLowerCase().includes(filterValue) ||
                message.Email.toLowerCase().includes(filterValue)
        );
    }
}