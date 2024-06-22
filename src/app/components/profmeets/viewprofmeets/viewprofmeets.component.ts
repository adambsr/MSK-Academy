import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MeetsService } from 'app/Services/meets.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Meets } from 'app/Models/Meets';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Config } from 'app/Config/Config';

@Component({
  selector: 'app-viewprofmeets',
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
  templateUrl: './viewprofmeets.component.html',
  styleUrl: './viewprofmeets.component.scss'
})
export class ViewprofmeetsComponent implements AfterViewInit, OnInit {
  configForm: UntypedFormGroup;

  public Config: Config = new Config;
  APIUrl : string = this.Config.getAPIPath();

  displayedColumns: string[] = [
      'position',
      'TitleMeet',
      'LinkMeet',
       'DateMeet',
      'actions',
      'status',
      //'Active',
  ];

  dataSource = new MatTableDataSource<Meets>();

  constructor(
      private router: Router,
      private dialog: MatDialog,
      private translocoService: TranslocoService,
      private _formBuilder: UntypedFormBuilder,
      private _fuseConfirmationService: FuseConfirmationService,
      private MeetsService : MeetsService
  ) {}


  @ViewChild(MatTable) table: MatTable<Meets>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  openEditMeetPage(element: any) {
      // Assuming `element` has an `id` property you want to pass to the edit route
      this.router.navigate(['dashboard/profmeets/edit/'+element.IdMeet]);
  }

  openAddMeetPage() {
      this.router.navigate(['dashboard/profmeets/add']);
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
  Meets : any;
  isEmptyData = false;

  ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          // map((value) => this._filter(value || ''))
          map((value) => (value ? this._filter(value) : []))
      );
      console.log(this.filteredOptions);

      this.getMeets();
  }

  getMeets(){
      this.MeetsService.getMeets().subscribe(
          (res: any) => {
            this.Meets = res;
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

      this.MeetsService.updateActiveMeets(id,NumberActive).subscribe((result: any) => {
          console.log(result);
          if (result.StatusCode == 302) {
              // duplicated
              alert('Title already exists');
          } else if (result.StatusCode == 1000) {
              if(NumberActive == 1){
                  alert('Meet Number '+id+ ' Enabled');
              }else{
                  alert('Meet Number '+id+ ' Disabled');
              }
              
              this.getMeets();
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
  openConfirmationDialog(element: Meets): void {
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

  deleteData(element: Meets) {
      // Filter the data array directly, removing the element
      console.log(element);
     

      this.MeetsService.deleteMeet(element.IdMeet).subscribe((data : any) =>{
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

  reconvertword(str : string): string {
    return this.Config.Reconvertword(str);
  }

  private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter((option) =>
          option.toLowerCase().includes(filterValue)
      );
  }
}
  
