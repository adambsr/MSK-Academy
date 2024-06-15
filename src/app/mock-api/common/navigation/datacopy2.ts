/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: 'all menu',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'project',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/dashboards/project',
            },
            {
                id   : 'dashboards.analytics',
                title: 'Analytics',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/analytics',
            },
            {
                id   : 'dashboards.finance',
                title: 'Finance',
                type : 'basic',
                icon : 'heroicons_outline:banknotes',
                link : '/dashboards/finance',
            },
            {
                id   : 'dashboards.crypto',
                title: 'Crypto',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/crypto',
            },
            {
                id   : 'dashboards.crypto',
                title: 'Users',
                type : 'collapsable',
                icon : 'heroicons_outline:academic-cap',
                link : '/users',
                children: [
                    {
                        id   : 'pages.authentication.sign-up.classic',
                        title: 'All Users',
                        type : 'basic',
                        link : '/users/view/1',
                    },
                    {
                        id   : 'pages.authentication.sign-up.modern',
                        title: 'Add User',
                        type : 'basic',
                        link : '/users/add',
                    },
                ]
            },
        ],
    },
    {
        id      : 'apps',
        title   : 'Applications',
        subtitle: 'Custom made application designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'apps.academy',
                title: 'Academy',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/apps/academy',
            },
            {
                id   : 'apps.chat',
                title: 'Chat',
                type : 'basic',
                icon : 'heroicons_outline:chat-bubble-bottom-center-text',
                link : '/apps/chat',
            }
        ]
   }
];
