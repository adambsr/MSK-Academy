import { CommonModule, DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FuseConfig, FuseConfigService } from '@fuse/services/config';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FusePlatformService } from '@fuse/services/platform';
import { FUSE_VERSION } from '@fuse/version';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { SettingsComponent } from 'app/layout/common/settings/settings.component';
import { EmptyLayoutComponent } from 'app/layout/layouts/empty/empty.component';
import { CenteredLayoutComponent } from 'app/layout/layouts/horizontal/centered/centered.component';
import { EnterpriseLayoutComponent } from 'app/layout/layouts/horizontal/enterprise/enterprise.component';
import { MaterialLayoutComponent } from 'app/layout/layouts/horizontal/material/material.component';
import { ModernLayoutHomeComponent } from './modernLayoutHome.component';
import { ModernLayoutComponent } from 'app/layout/layouts/horizontal/modern/modern.component';
import { ClassicLayoutComponent } from 'app/layout/layouts/vertical/classic/classic.component';
import { ClassyLayoutComponent } from 'app/layout/layouts/vertical/classy/classy.component';
import { CompactLayoutComponent } from 'app/layout/layouts/vertical/compact/compact.component';
import { DenseLayoutComponent } from 'app/layout/layouts/vertical/dense/dense.component';
import { FuturisticLayoutComponent } from 'app/layout/layouts/vertical/futuristic/futuristic.component';
import { ThinLayoutComponent } from 'app/layout/layouts/vertical/thin/thin.component';

@Component({
    selector     : 'layoutHome',
    templateUrl  : './layoutHome.component.html',
    styleUrls    : ['./layoutHome.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    template: '<router-outlet></router-outlet>',
    imports      : [NgIf, CommonModule, RouterModule, ModernLayoutHomeComponent,ModernLayoutComponent, SettingsComponent, EmptyLayoutComponent, MaterialLayoutComponent, ClassicLayoutComponent ],
    //exports      : [RouterModule]
})
export class LayoutHomeComponent implements OnInit, OnDestroy
{
    config: FuseConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;
    isToogle: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private _document: any,
        private _renderer2: Renderer2,
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fusePlatformService: FusePlatformService,
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
        // Set the theme and scheme based on the configuration
        // combineLatest([
        //     this._fuseConfigService.config$,
        //     this._fuseMediaWatcherService.onMediaQueryChange$(['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)']),
        // ]).pipe(
        //     takeUntil(this._unsubscribeAll),
        //     map(([config, mql]) =>
        //     {
        //         const options = {
        //             scheme: config.scheme,
        //             theme : config.theme,
        //         };

        //         // If the scheme is set to 'auto'...
        //         if ( config.scheme === 'auto' )
        //         {
        //             // Decide the scheme using the media query
        //             options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
        //         }

        //         return options;
        //     }),
        // ).subscribe((options) =>
        // {
        //     // Store the options
        //     this.scheme = options.scheme;
        //     this.theme = options.theme;

        //     // Update the scheme and theme
        //     this._updateScheme();
        //     this._updateTheme();
        // });

        // // Subscribe to config changes
        // this._fuseConfigService.config$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((config: FuseConfig) =>
        //     {
        //         // Store the config
        //         this.config = config;

        //         // Update the layout
        //         this._updateLayout();
        //     });

        // // Subscribe to NavigationEnd event
        // this._router.events.pipe(
        //     filter(event => event instanceof NavigationEnd),
        //     takeUntil(this._unsubscribeAll),
        // ).subscribe(() =>
        // {
        //     // Update the layout
        //     this._updateLayout();
        // });

        // // Set the app version
        // this._renderer2.setAttribute(this._document.querySelector('[ng-version]'), 'fuse-version', FUSE_VERSION);

        // // Set the OS name
        // this._renderer2.addClass(this._document.body, this._fusePlatformService.osName);
    }

    SignIn(){
        this._router.navigate(['sign-in']);
    }

    toggleNavbarVisibility(): void {
        const navbar = document.getElementById('navbar-sticky');
        if (navbar) {
          navbar.classList.toggle('hidden'); // Toggle the 'hidden' class
        }else{
          navbar.classList.remove('hidden');  
        }
      }

      Toogle(){
        //alert(this.isToogle);
        const navbar = document.getElementById('navbar-sticky');
        if (this.isToogle == false) {
          navbar.classList.toggle('hidden'); // Toggle the 'hidden' class
          this.isToogle = true;
        }else{
          navbar.classList.remove('hidden');  
          this.isToogle = false; 
        }
      
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the selected layout
     */
    private _updateLayout(): void
    {
        // Get the current activated route
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        // 1. Set the layout from the config
        this.layout = this.config.layout;

        // 2. Get the query parameter from the current route and
        // set the layout and save the layout to the config
        const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');
        if ( layoutFromQueryParam )
        {
            this.layout = layoutFromQueryParam;
            if ( this.config )
            {
                this.config.layout = layoutFromQueryParam;
            }
        }

        // 3. Iterate through the paths and change the layout as we find
        // a config for it.
        //
        // The reason we do this is that there might be empty grouping
        // paths or componentless routes along the path. Because of that,
        // we cannot just assume that the layout configuration will be
        // in the last path's config or in the first path's config.
        //
        // So, we get all the paths that matched starting from root all
        // the way to the current activated route, walk through them one
        // by one and change the layout as we find the layout config. This
        // way, layout configuration can live anywhere within the path and
        // we won't miss it.
        //
        // Also, this will allow overriding the layout in any time so we
        // can have different layouts for different routes.
        const paths = route.pathFromRoot;
        paths.forEach((path) =>
        {
            // Check if there is a 'layout' data
            if ( path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout )
            {
                // Set the layout
                this.layout = path.routeConfig.data.layout;
            }
        });
    }

    /**
     * Update the selected scheme
     *
     * @private
     */
    private _updateScheme(): void
    {
        // Remove class names for all schemes
        this._document.body.classList.remove('light', 'dark');

        // Add class name for the currently selected scheme
        this._document.body.classList.add(this.scheme);
    }

    /**
     * Update the selected theme
     *
     * @private
     */
    private _updateTheme(): void
    {
        // Find the class name for the previously selected theme and remove it
        this._document.body.classList.forEach((className: string) =>
        {
            if ( className.startsWith('theme-') )
            {
                this._document.body.classList.remove(className, className.split('-')[1]);
            }
        });

        // Add class name for the currently selected theme
        this._document.body.classList.add(this.theme);
    }
}
