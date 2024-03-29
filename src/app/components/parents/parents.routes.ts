import { Routes } from "@angular/router";
import { AddparentComponent } from "./addparent/addparent.component";
import { EditparentComponent } from "./editparent/editparent.component";
import { ViewparentComponent } from "./viewparent/viewparent.component";

export default [
    {
        path     : '',
        children: [
            {
                 path: '',
                 redirectTo: 'view/1',
                 pathMatch: 'full' 
            },
            {
                path: 'add',
                component: AddparentComponent,
                data: {
                    title: 'Add parent'
                }
            },
            {
                path: 'edit/:id',
                component: EditparentComponent,
                data: {
                    title: 'Edit parent'
                }
            },
            {
                path: 'view/:id',
                component: ViewparentComponent,
                data: {
                    title: 'View parent'
                }
            } 

        ]
    },
] as Routes;