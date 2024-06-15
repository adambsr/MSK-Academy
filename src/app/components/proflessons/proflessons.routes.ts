import { Routes } from "@angular/router";
import { ViewproflessonsComponent } from "./viewproflessons/viewproflessons.component";
import { EditproflessonsComponent } from "./editproflessons/editproflessons.component";
import { AddproflessonsComponent } from "./addproflessons/addproflessons.component";

export default [
    {
        path     : '',
        children: [
            {
                 path: '',
                 redirectTo: 'view',
                 pathMatch: 'full' 
            },
            {
                path: 'add',
                component: AddproflessonsComponent,
                data: {
                    title: 'Add profcourses'
                }
            },
            {
                path: 'edit/:id',
                component: EditproflessonsComponent,
                data: {
                    title: 'Edit establishment'
                }
            },
            {
                path: 'view/:id',
                component: ViewproflessonsComponent,
                data: {
                    title: 'View establishment'
                }
            } 

        ]
    },
] as Routes;