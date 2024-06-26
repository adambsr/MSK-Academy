import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mycertificates',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    TranslocoModule,
    CommonModule,
  ],
  templateUrl: './mycertificates.component.html',
  styleUrls: ['./mycertificates.component.scss']
})
export class MycertificatesComponent implements OnInit {
  configForm: UntypedFormGroup;

  displayedColumns: string[] = [
      'CertificateTitle',
      'CourseName',
      'DateEarned',
      'Actions',
  ];

  dataSource: MatTableDataSource<CertificateElement>;

  constructor(private router: Router) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  openPrintPage(element: any) {
      this.router.navigate(['/printCertificate/', element.CertificateTitle]);
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
  }

  myControl = new FormControl('');
  options: string[] = [
      'Java certificate',
      'UX/UI Design certificate',
      'Python certificate',
      'History of Arts certificate',
      'Java',
      'UX/UI Design',
      'Python',
      'History of Arts',
  ];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
      );
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option =>
          option.toLowerCase().includes(filterValue)
      );
  }
}

export interface CertificateElement {
  CertificateTitle: string;
  CourseName: string;
  DateEarned: Date;
}

const ELEMENT_DATA: CertificateElement[] = [
  {
      CertificateTitle: 'SEO Beginner Certificate',
      CourseName: 'SEO Beginner',
      DateEarned: new Date(2024, 3, 8),
  },
  {
      CertificateTitle: 'Angular Advanced Certificate',
      CourseName: 'Angular Advanced',
      DateEarned: new Date(2024, 2, 18),
  },
  {
      CertificateTitle: 'PHP Certificate',
      CourseName: 'PHP',
      DateEarned: new Date(2024, 4, 20),
  },
];
