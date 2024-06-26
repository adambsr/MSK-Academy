/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: 'Unique dashboard designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            //Home

            // Help Center

            //ANALYTICS
            {
                id   : 'dashboards.analytics',
                title: 'Analytics',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboard/analytics',
            },
            {
                id  : 'divider-2',
                type: 'divider',
            },
            //USERS
            {
                id  : 'dashboards.users',
                title: 'Users',
                type:  'collapsable',
                icon:  'heroicons_outline:user-group',
                link:  '/dashboards/users',
                children: [
                    {
                        id   : 'user.add',
                        title: 'Add user',
                        type : 'basic',
                        icon : 'heroicons_outline:user-plus',
                        link : '/dashboard/users/add',
                    },
                    {
                        id   : 'user.view',
                        title: 'Users list',
                        type : 'basic',
                        icon : 'heroicons_outline:list-bullet',
                        link : '/dashboard/users/view/1',
                    },
                ]
            },
            //TUTORS
            {
                id  : 'dashboards.tutors',
                title: 'Tutors',
                type:  'collapsable',
                icon:  'heroicons_outline:briefcase',
                link:  '/dashboards/tutors',
                children: [
                    {
                        id   : 'tutor.view',
                        title: 'Tutors list',
                        type : 'basic',
                        icon : 'heroicons_outline:list-bullet',
                        link : '/dashboard/tutors/view/1',
                    },
                ]
            },
            //CANDIDATES
            {
                id  : 'dashboards.candidates',
                title: 'Candidates',
                type:  'collapsable',
                icon:  'heroicons_outline:academic-cap',
                link:  '/dashboards/candidates',
                children: [
                    {
                        id   : 'candidate.view',
                        title: 'Candidates list',
                        type : 'basic',
                        icon : 'heroicons_outline:list-bullet',
                        link : '/dashboard/candidates/view/1',
                    },
                ]
            },
            {
                id  : 'divider-2',
                type: 'divider',
            },
            //CATEGORIES
            {
                id: 'dashboards.categories',
                title: 'Categories',
                type: 'collapsable',
                icon: 'heroicons_outline:square-3-stack-3d',
                link: '/dashboards/categories',
                children: [
                    {
                        id: 'category.add',
                        title: 'Add category',
                        type: 'basic',
                        icon: 'heroicons_outline:plus',
                        link: '/dashboard/categories/add',
                    },
                     
                    {
                        id: 'category.view',
                        title: 'Categories list',
                        type: 'basic',
                        icon: 'heroicons_outline:list-bullet',
                        link: '/dashboard/categories/view/1',
                    },
                ],
            },
            //COURSES
            {
                id  : 'dashboards.courses',
                title: 'Courses',
                type:  'collapsable',
                icon:  'heroicons_outline:book-open',
                link:  '/dashboards/courses',
                children: [
                    {
                        id   : 'Course.add',
                        title: 'Add Course',
                        type : 'basic',
                        icon : 'heroicons_outline:plus',
                        link : '/dashboard/profcourses/add',
                    },
                    {
                        id   : 'courses.view',
                        title: 'Courses list',
                        type : 'basic',
                        icon : 'heroicons_outline:list-bullet',
                        link : '/dashboard/profcourses/view/1',
                    },
                ]
            },
            //LESSONS
            {
                id  : 'dashboards.lessons',
                title: 'Lessons',
                type:  'collapsable',
                icon:  'heroicons_outline:document-duplicate',
                link:  '/dashboards/lessons',
                children: [
                    {
                        id   : 'lesson.add',
                        title: 'Add Lesson',
                        type : 'basic',
                        icon : 'heroicons_outline:plus',
                        link : '/dashboard/proflessons/add',
                    },
                    {
                        id   : 'lesson.view',
                        title: 'Lessons list',
                        type : 'basic',
                        icon : 'heroicons_outline:list-bullet',
                        link : '/dashboard/proflessons/view/1',
                    },
                ]
            },
            //MEETS
            {
                id  : 'dashboards.meets',
                title: 'Meets',
                type:  'collapsable',
                icon:  'heroicons_outline:video-camera',
                link:  '/dashboards/meets',
                children: [
                    {
                        id   : 'meet.add',
                        title: 'Add meet',
                        type : 'basic',
                        icon : 'heroicons_outline:plus',
                        link : '/dashboard/profmeets/add',
                    },
                    {
                        id   : 'meet.view',
                        title: 'Meets list',
                        type : 'basic',
                        icon : 'heroicons_outline:list-bullet',
                        link : '/dashboard/profmeets/view/1',
                    },
                ]
            },
            //BADGES
            {
                id  : 'dashboards.badges',
                title: 'Badges',
                type:  'collapsable',
                icon:  'heroicons_outline:shield-check',
                link:  '/dashboards/badges',
                children: [
                    {
                        id   : 'badge.add',
                        title: 'Add badge',
                        type : 'basic',
                        icon : 'heroicons_outline:plus',
                        link : '/dashboard/badges/add',
                    },
                    {
                        id   : 'badge.view',
                        title: 'Badges list',
                        type : 'basic',
                        icon : 'heroicons_outline:list-bullet',
                        link : '/dashboard/badges/view/1',
                    },
                ]
            },
            {
                id  : 'divider-2',
                type: 'divider',
            },
            //MY COURSES
            {
                id   : 'myCourse.view',
                title: 'My Courses',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/dashboard/mycourse/view/1',
            },
            //MY MEETS
            {
                id   : 'myMeets.view',
                title: 'My Meets',
                type : 'basic',
                icon : 'heroicons_outline:video-camera',
                link : '/dashboard/mymeets/view/1',
            },
            //MY BADGES
            {
                id   : 'myBadges.view',
                title: 'My Badges',
                type : 'basic',
                icon : 'heroicons_outline:shield-check',
                link : 'mybadges/view/1',
            },
            //MY CERTIFICATES
            {
                id   : 'myCertificates.view',
                title: 'My Certificates',
                type : 'basic',
                icon : 'heroicons_outline:trophy',
                link : 'mycertificates/view/1',
            },
        ],
    },
    // {
    //     id      : 'apps',
    //     title   : 'Applications',
    //     subtitle: 'Custom made application designs',
    //     type    : 'group',
    //     icon    : 'heroicons_outline:computer-desktop',
    //     children: [
    //         {
    //             id   : 'apps.academy',
    //             title: 'Academy',
    //             type : 'basic',
    //             icon : 'heroicons_outline:academic-cap',
    //             link : '/apps/academy',
    //         },
    //     ],
    // },

    // {
    //     id  : 'divider-1',
    //     type: 'divider',
    // },
    {
        id      : 'pages',
        title   : 'Pages',
        subtitle: 'Custom made page designs',
        type    : 'group',
        icon    : 'heroicons_outline:document',
        children: [
            {
                id   : 'pages.profile',
                title: 'Profile',
                type : 'basic',
                icon : 'heroicons_outline:user-circle',
                link : 'profile',
            },
            {
                id   : 'pages.settings',
                title: 'Settings',
                type : 'basic',
                icon : 'heroicons_outline:cog-8-tooth',
                link : 'settings',
            },
        ],
    },
    // {
    //     id      : 'documentation',
    //     title   : 'Documentation',
    //     subtitle: 'Everything you need to know about Fuse',
    //     type    : 'group',
    //     icon    : 'heroicons_outline:information-circle',
    //     children: [
    //         {
    //             id   : 'documentation.changelog',
    //             title: 'Changelog',
    //             type : 'basic',
    //             icon : 'heroicons_outline:megaphone',
    //             link : '/docs/changelog',
    //             badge: {
    //                 title  : '19.0.0',
    //                 classes: 'px-2 bg-yellow-300 text-black rounded-full',
    //             },
    //         },
           
          
            
    //     ],
    // },
    // {
    //     id  : 'divider-2',
    //     type: 'divider',
    // },
    // {
    //     id      : 'navigation-features',
    //     title   : 'Navigation features',
    //     subtitle: 'Collapsable levels & badge styles',
    //     type    : 'group',
    //     icon    : 'heroicons_outline:bars-3',
    //     children: [
    //         {
    //             id      : 'navigation-features.level.0',
    //             title   : 'Level 0',
    //             icon    : 'heroicons_outline:check-circle',
    //             type    : 'collapsable',
    //             children: [
    //                 {
    //                     id      : 'navigation-features.level.0.1',
    //                     title   : 'Level 1',
    //                     type    : 'collapsable',
    //                     children: [
    //                         {
    //                             id      : 'navigation-features.level.0.1.2',
    //                             title   : 'Level 2',
    //                             type    : 'collapsable',
    //                             children: [
    //                                 {
    //                                     id      : 'navigation-features.level.0.1.2.3',
    //                                     title   : 'Level 3',
    //                                     type    : 'collapsable',
    //                                     children: [
    //                                         {
    //                                             id      : 'navigation-features.level.0.1.2.3.4',
    //                                             title   : 'Level 4',
    //                                             type    : 'collapsable',
    //                                             children: [
    //                                                 {
    //                                                     id      : 'navigation-features.level.0.1.2.3.4.5',
    //                                                     title   : 'Level 5',
    //                                                     type    : 'collapsable',
    //                                                     children: [
    //                                                         {
    //                                                             id   : 'navigation-features.level.0.1.2.3.4.5.6',
    //                                                             title: 'Level 6',
    //                                                             type : 'basic',
    //                                                         },
    //                                                     ],
    //                                                 },
    //                                             ],
    //                                         },
    //                                     ],
    //                                 },
    //                             ],
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
         
           
           
          
            
    //     ],
    // },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        tooltip : 'Dashboards',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'Apps',
        tooltip : 'Apps',
        type    : 'aside',
        icon    : 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        tooltip : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'UI',
        tooltip : 'UI',
        type    : 'aside',
        icon    : 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Navigation',
        tooltip : 'Navigation',
        type    : 'aside',
        icon    : 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'DASHBOARDS',
        type    : 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'APPS',
        type    : 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id   : 'others',
        title: 'OTHERS',
        type : 'group',
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'User Interface',
        type    : 'aside',
        icon    : 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Navigation Features',
        type    : 'aside',
        icon    : 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'Apps',
        type    : 'group',
        icon    : 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'group',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'UI',
        type    : 'group',
        icon    : 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Misc',
        type    : 'group',
        icon    : 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
