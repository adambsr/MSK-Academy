import { Routes } from "@angular/router";
import { AddprofmeetsComponent } from "./addprofmeets/addprofmeets.component";
import { EditprofmeetsComponent } from "./editprofmeets/editprofmeets.component";
import { ViewprofmeetsComponent } from "./viewprofmeets/viewprofmeets.component";

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
                component: AddprofmeetsComponent,
                data: {
                    title: 'Add profcourses'
                }
            },
            {
                path: 'edit/:id',
                component: EditprofmeetsComponent,
                data: {
                    title: 'Edit establishment'
                }
            },
            {
                path: 'view/:id',
                component: ViewprofmeetsComponent,
                data: {
                    title: 'View establishment'
                }
            } 

        ]
    },
] as Routes;