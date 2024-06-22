import { Routes } from "@angular/router";
import { AddbadgeComponent } from "./addbadge/addbadge.component";
import { EditbadgeComponent } from "./editbadge/editbadge.component";
import { ViewbadgeComponent } from "./viewbadge/viewbadge.component";

export default [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'view/1',
                pathMatch: 'full' 
            },
            {
                path: 'add',
                component: AddbadgeComponent,
                data: {
                    title: 'Add badge'
                }
            },
            {
                path: 'edit/:id',
                component: EditbadgeComponent,
                data: {
                    title: 'Edit badge'
                }
            },
            {
                path: 'view/:id',
                component: ViewbadgeComponent,
                data: {
                    title: 'View badge'
                }
            } 
        ]
    },
] as Routes;