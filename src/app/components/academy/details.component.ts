import { CdkScrollable } from '@angular/cdk/scrolling';
import { DOCUMENT, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Config } from 'app/Config/Config';
import { CoursesService } from 'app/Services/courses.service';
import { LessonsService } from 'app/Services/lessons.service';
import { AcademyService } from 'app/modules/admin/apps/academy/academy.service';
import { Category, Course } from 'app/modules/admin/apps/academy/academy.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'academy-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatSidenavModule, RouterLink, MatIconModule, NgIf, NgClass, NgFor, MatButtonModule, MatProgressBarModule, CdkScrollable, MatTabsModule, FuseFindByKeyPipe],
})
export class AcademyDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('courseSteps', {static: true}) courseSteps: MatTabGroup;
    categories: Category[];
    course: Course;
    currentStep: number = 0;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public Config: Config = new Config();

    idCourse: number = 4;
    myCourse : any;
    myLesson : any;
    lessons : any;
    enrolledLessons : any;
    totalLessons : number = 0;
    currentOrderLesson: number = 1;
    currentLessonImg : string = "";
    currentLessonContent : any =" ";
    idUser : number = Number(localStorage.getItem("UserId"));
    currentLesson: any;

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _academyService: AcademyService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private coursesService : CoursesService,
        private LessonsService: LessonsService,
        private router: Router, 
        private route: ActivatedRoute
    )
    {
        this.route.params.subscribe((params: Params) => {
            this.idCourse = params['id'];}
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        //this.fetchCourseDetails();




        this.coursesService.getCourseById(this.idCourse).subscribe(
            (resCourse: any) => {
                this.myCourse = resCourse[0];
                console.log(resCourse);
            },
            (error) => {
                console.log("Error getCourseById " + this.idCourse);
                console.error(error);
            }
        );

     

        this.LessonsService.getLessonByCourse(this.idCourse).subscribe(
            (resLesson: any) => {
                this.lessons = resLesson;
                this.totalLessons = resLesson.length;
                this.currentLessonContent = resLesson[0].ContentLesson;
                this.currentLessonImg = resLesson[0].PictureLesson;

                console.log(resLesson);

            },
            (error) => {
                console.log("Error getLessonByCourse " + this.idCourse);
                console.error(error);
            }
          );

          this.LessonsService.GetEnrolledLessonByCourse(this.idCourse,this.idUser).subscribe(
            (resLesson: any) => {
                console.log(resLesson);
                this.enrolledLessons = resLesson;
                //this.totalLessons = resLesson.length;
                //this.currentLessonContent = resLesson[0].ContentLesson;
                this.currentOrderLesson = resLesson[0].ProgressCurrentLesson;

                // NOTICE: important !!!!! this.currentOrderLesson -1  because table begin with 0 and order begin with 1. 
                this.currentLessonContent = this.lessons[this.currentOrderLesson -1 ].ContentLesson;
                this.currentLessonImg = this.lessons[this.currentOrderLesson - 1 ].PictureLesson;
 
                console.log(this.currentLessonImg);

            },
            (error) => {
                console.log("Error GetEnrolledLessonByCourse " + this.idCourse);
                console.error(error);
            }
          );
        
        // Get the categories
        // this._academyService.categories$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((categories: Category[]) =>
        //     {
        //         // Get the categories
        //         this.categories = categories;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the course
        // this._academyService.course$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((course: Course) =>
        //     {
        //         // Get the course
        //         this.course = course;

        //         // Go to step
        //         //this.goToStep(course.progress.currentStep);

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Subscribe to media changes
        // this._fuseMediaWatcherService.onMediaChange$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(({matchingAliases}) =>
        //     {
        //         // Set the drawerMode and drawerOpened
        //         if ( matchingAliases.includes('lg') )
        //         {
        //             this.drawerMode = 'side';
        //             this.drawerOpened = true;
        //         }
        //         else
        //         {
        //             this.drawerMode = 'over';
        //             this.drawerOpened = false;
        //         }

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
    }


    async fetchCourseDetails() {
     
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

    getLessonPicture(PictureLesson: string): string {
        return this.Config.getPhotoPath('lessons') + PictureLesson;
    }

    updateProgressLesson(){
        this.LessonsService.UpdateLessonProgress(this.idCourse,this.idUser,this.currentOrderLesson).subscribe(
            (resEnrool: any) => {
                
                console.log(resEnrool);

            },
            (error) => {
                console.log("Error UpdateLessonProgress " + this.idCourse);
                console.error(error);
            }
          );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to given step
     *
     * @param step
     */
    goToStep(LessonOrder: number, lessonContent : any , lessonImg : any ): void
    {
        // Set the current step
        //this.currentStep = step;
        this.currentOrderLesson = LessonOrder; 
        this.currentLessonContent = lessonContent;
        this.currentLessonImg = lessonImg;

        //UpdateLessonProgress(idCourse: number,idCandidate: number,OrderLesson: number)

        this.updateProgressLesson();
        // Go to the step
        //this.courseSteps.selectedIndex = this.currentStep;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Go to previous step
     */
    goToPreviousStep(): void
    {
        // Return if we already on the first step
        if ( this.currentOrderLesson === 1 )
        {
            
            return;
        }

        this.currentOrderLesson --;
        // Go to step
        this.goToStep(this.currentOrderLesson   ,this.lessons[this.currentOrderLesson - 1 ].ContentLesson, this.lessons[this.currentOrderLesson -1 ].PictureLesson);

        // Scroll the current step selector from sidenav into view
        this._scrollCurrentStepElementIntoView();
    }

    /**
     * Go to next step
     */
    goToNextStep(): void
    {
        // Return if we already on the last step
        if ( this.currentOrderLesson === this.totalLessons  )
        {
            this.updateProgressLesson();
            return;
        }

        this.currentOrderLesson ++;

        // Go to step
        this.goToStep(this.currentOrderLesson,this.lessons[this.currentOrderLesson -1 ].ContentLesson, this.lessons[this.currentOrderLesson -1 ].PictureLesson);

        // Scroll the current step selector from sidenav into view
        this._scrollCurrentStepElementIntoView();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Scrolls the current step element from
     * sidenav into the view. This only happens when
     * previous/next buttons pressed as we don't want
     * to change the scroll position of the sidebar
     * when the user actually clicks around the sidebar.
     *
     * @private
     */
    private _scrollCurrentStepElementIntoView(): void
    {
        // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
        setTimeout(() =>
        {
            // Get the current step element and scroll it into view
            const currentStepElement = this._document.getElementsByClassName('current-step')[0];
            if ( currentStepElement )
            {
                currentStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block   : 'start',
                });
            }
        });
    }


}
