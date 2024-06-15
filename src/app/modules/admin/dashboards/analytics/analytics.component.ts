import { DecimalPipe, NgFor } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { StatisticsService } from 'app/Services/statistics.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'analytics',
    templateUrl: './analytics.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        MatTooltipModule,
        NgFor,
        DecimalPipe,
        TranslocoModule,
    ],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
    //tutors
    numberTutors: number;
    chartGender: ApexOptions;
    chartAge: ApexOptions;
    Gender: any;
    Age: any;
    //candidates
    numberCandidates: number;
    chartGenderC: ApexOptions;
    chartAgeC: ApexOptions;
    GenderC: any;
    AgeC: any;
    //categories, courses, badges
    numberCategories: number;
    numberCourses: number;
    numberBadges: number;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _statisticsService: StatisticsService,
        private translocoService: TranslocoService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        //Tutors
        this._statisticsService.getCountTutors().subscribe(
            (res: any) => {
                this.numberTutors = res;
                console.log(res);
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        this._statisticsService.getCountTutorsByGender().subscribe(
            (res: any) => {
                this.Gender = res;
                console.log(res);
                this._prepareChartData();
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        this._statisticsService.getCountTutorsByAge().subscribe(
            (res: any) => {
                this.Age = res;
                console.log(res);
                this._prepareChartData();
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        //Candidates
        this._statisticsService.getCountCandidates().subscribe(
            (res: any) => {
                this.numberCandidates = res;
                console.log(res);
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        this._statisticsService.getCountCandidatesByGender().subscribe(
            (res: any) => {
                this.GenderC = res;
                console.log(res);
                this._prepareChartData();
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        this._statisticsService.getCountCandidatesByAge().subscribe(
            (res: any) => {
                this.AgeC = res;
                console.log(res);
                this._prepareChartData();
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        //Categories, Courses, Badges..
        this._statisticsService.getCountCategories().subscribe(
            (res: any) => {
                this.numberCategories = res;
                console.log(res);
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        this._statisticsService.getCountCourses().subscribe(
            (res: any) => {
                this.numberCourses = res;
                console.log(res);
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        this._statisticsService.getCountBadges().subscribe(
            (res: any) => {
                this.numberBadges = res;
                console.log(res);
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error: Connexion Server');
                }
            }
        );

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter((el) => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute(
                    'fill',
                    `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`
                );
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Tutor Gender
        this.chartGender = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#319795', '#4FD1C5'],
            labels: [
                this.translocoService.translate('Female'),
                this.translocoService.translate('Male')
              ],
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%',
                    },
                },
            },
            series: [this.Gender.Female, this.Gender.Male],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                     <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                     <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                     <div class="ml-2 text-md font-bold leading-none">${((w.config.series[seriesIndex] / (w.config.series[0] + w.config.series[1]))*100).toFixed(2)}%</div>
                                                 </div>`,
            },
        };
    
        // Tutor Age
        this.chartAge = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#DD6B20', '#F6AD55'],
            labels: [
                this.translocoService.translate('Above 30'),
                this.translocoService.translate('Under 30')
              ],
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%',
                    },
                },
            },
            series: [this.Age.Above_30, this.Age.Under_30],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${((w.config.series[seriesIndex] / (w.config.series[0] + w.config.series[1]))*100).toFixed(2)}%</div>
                                                </div>`,
            },
        };

        // Candidate Gender
        this.chartGenderC = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#805AD5', '#B794F4'],
            labels: [
                this.translocoService.translate('Female'),
                this.translocoService.translate('Male')
              ],
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%',
                    },
                },
            },
            // series: [this.GenderC.Female, this.GenderC.Male],
            series: [29, 15],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                     <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                     <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                     <div class="ml-2 text-md font-bold leading-none">${((w.config.series[seriesIndex] / (w.config.series[0] + w.config.series[1]))*100).toFixed(2)}%</div>
                                                 </div>`,
            },
        };

        // Candidate Age
        this.chartAgeC = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#3182CE', '#63B3ED'],
            labels: [
                this.translocoService.translate('Above 30'),
                this.translocoService.translate('Under 30')
              ],
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%',
                    },
                },
            },
            // series: [this.AgeC.Above_30, this.AgeC.Under_30],
            series: [12, 32],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${((w.config.series[seriesIndex] / (w.config.series[0] + w.config.series[1]))*100).toFixed(2)}%</div>
                                                </div>`,
            },
        };
    }
}
