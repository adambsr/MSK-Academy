import { Routes } from "@angular/router";
import { AddprofcoursesComponent } from "./addprofcourses/addprofcourses.component";
import { EditprofcoursesComponent } from "./editprofcourses/editprofcourses.component";
import { ViewprofcoursesComponent } from "./viewprofcourses/viewprofcourses.component";

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
                component: AddprofcoursesComponent,
                data: {
                    title: 'Add profcourses'
                }
            },
            {
                path: 'edit/:id',
                component: EditprofcoursesComponent,
                data: {
                    title: 'Edit establishment'
                }
            },
            {
                path: 'view/:id',
                component: ViewprofcoursesComponent,
                data: {
                    title: 'View establishment'
                }
            } 

        ]
    },
] as Routes;