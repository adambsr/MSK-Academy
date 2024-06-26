import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Config } from 'app/Config/Config';
import { Badges } from 'app/Models/badges';
import { BadgesService } from 'app/Services/badges.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mybadges',
  standalone: true,
  imports: [
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
    CommonModule,
    MatSlideToggleModule,
],
  templateUrl: './mybadges.component.html',
  styleUrl: './mybadges.component.scss'
})
export class MybadgesComponent implements OnInit {

  public Config: Config = new Config();
  configForm: UntypedFormGroup;

  displayedColumns: string[] = [
      'photoBadge',
      'nameBadge',
      'descriptionBadge',
  ];

  dataSource = new MatTableDataSource<Badges>();

  constructor(
      private badgesService: BadgesService
  ) { }

  @ViewChild(MatTable) table: MatTable<Badges>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
  isEmptyData = false;
  Badges: any;

  ngOnInit() {
      this.getBadges();
  }

  getBadges() {
      this.badgesService.getAllBadges().subscribe(
          (res: any) => {
              this.Badges = res;
              console.log(res);
              if (res != "Empty" && res != "") {
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
                  alert("Error Connexion Server");
              }
          }
      );
  }

  getPhotoBadge(PhotoBadge: string): string {
      return this.Config.getPhotoPath('badges') + PhotoBadge;
  }

  private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter((option) =>
          option.toLowerCase().includes(filterValue)
      );
  }
}
