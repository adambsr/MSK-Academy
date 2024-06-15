import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { I18nPluralPipe, NgClass, NgFor, NgIf, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef,  OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { AcademyService } from 'app/modules/admin/apps/academy/academy.service';
import { Category, Course } from 'app/modules/admin/apps/academy/academy.types';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { Courses } from 'app/Models/courses';
import { CategoriesService } from 'app/Services/categories.service';
import { Categories } from 'app/Models/categories';
import { CoursesService } from 'app/Services/courses.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpCenterService } from 'app/modules/admin/apps/help-center/help-center.service';
import { FaqCategory } from 'app/modules/admin/apps/help-center/help-center.type';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { Config } from 'app/Config/Config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule, CdkScrollable, MatFormFieldModule, MatSelectModule, MatOptionModule, NgFor, MatIconModule, MatInputModule, MatSlideToggleModule, NgIf, NgClass, MatTooltipModule, MatProgressBarModule, MatButtonModule, RouterLink, FuseFindByKeyPipe, PercentPipe, I18nPluralPipe,MatButtonModule, RouterLink, MatIconModule, NgFor, MatExpansionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // categories: Category[];
  categories: Categories[];
  courses: Courses[];

  faqCategories: FaqCategory[];

  public Config: Config = new Config();

  filters: string[] = ['all', 'Programming', 'Marketing', 'Angular', 'CSS', 'C#'];
  numberOfCards: any = {};
  selectedFilter: string = 'all';
  random : number = Math.floor(Math.random() * 100);

 

    filteredCourses: Course[];
    // filters: {
    //     categorySlug$: BehaviorSubject<string>;
    //     query$: BehaviorSubject<string>;
    //     hideCompleted$: BehaviorSubject<boolean>;
    // } = {
    //     categorySlug$ : new BehaviorSubject('all'),
    //     query$        : new BehaviorSubject(''),
    //     hideCompleted$: new BehaviorSubject(false),
    // };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _academyService: AcademyService,
        private categoriesService : CategoriesService,
        private coursesService : CoursesService,
        private _helpCenterService: HelpCenterService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the categories
        // this._academyService.categories$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((categories: Category[]) =>
        //     {
        //         this.categories = categories;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        this._helpCenterService.faqs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((faqCategories) =>
            {
                this.faqCategories = faqCategories;
            });

        this.categoriesService.getCategories().subscribe(
          (res: any) => {
            this.categories = res;
            //this.Role=res;
            console.log(res);
          },
          (error: any) => {
            console.log(error);
            if (error.status == 400 || error.status == 0) {
              // Bad Request
              alert("Error Connexion Server");
            }
          }
        );

        this.coursesService.getcourses().subscribe(
          (res: any) => {
            this.courses = res;
            //this.Role=res;
            console.log(res);
          },
          (error: any) => {
            console.log(error);
            if (error.status == 400 || error.status == 0) {
              // Bad Request
              alert("Error Connexion Server");
            }
          }
        );

        // Get the courses
        // this._academyService.courses$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((courses: Course[]) =>
        //     {
        //         this.courses = this.filteredCourses = courses;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Filter the courses
        // combineLatest([this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$])
        //     .subscribe(([categorySlug, query, hideCompleted]) =>
        //     {
        //         // Reset the filtered courses
        //         this.filteredCourses = this.courses;

        //         // Filter by category
        //         if ( categorySlug !== 'all' )
        //         {
        //             this.filteredCourses = this.filteredCourses.filter(course => course.category === categorySlug);
        //         }

        //         // Filter by search query
        //         if ( query !== '' )
        //         {
        //             this.filteredCourses = this.filteredCourses.filter(course => course.title.toLowerCase().includes(query.toLowerCase())
        //                 || course.description.toLowerCase().includes(query.toLowerCase())
        //                 || course.category.toLowerCase().includes(query.toLowerCase()));
        //         }

        //         // Filter by completed
        //         if ( hideCompleted )
        //         {
        //             this.filteredCourses = this.filteredCourses.filter(course => course.progress.completed === 0);
        //         }
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    getCoursePicture(PictureCourse: string): string {
      return `${this.Config.getPhotoPath('courses')}${PictureCourse}`;
  }

   
    /**
     * On filter change
     *
     * @param change
     */
    onFilterChange(change: MatButtonToggleChange): void
    {
        // Set the filter
        this.selectedFilter = change.value;

        // Filter the cards
        //this._filterCards();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter by search query
     *
     * @param query
     */
    // filterByQuery(query: string): void
    // {
    //     this.filters.query$.next(query);
    // }

    /**
     * Filter by category
     *
     * @param change
     */
    // filterByCategory(change: MatSelectChange): void
    // {
    //     this.filters.categorySlug$.next(change.value);
    // }

    /**
     * Show/hide completed courses
     *
     * @param change
     */
    // toggleCompleted(change: MatSlideToggleChange): void
    // {
    //     this.filters.hideCompleted$.next(change.checked);
    // }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    // trackByFn(index: number, item: any): any
    // {
    //     return item.id || index;
    // }

}
