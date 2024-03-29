import { Routes } from "@angular/router";
import { AddtutorComponent } from "./addtutor/addtutor.component";
import { EdittutorComponent } from "./edittutor/edittutor.component";
import { ViewtutorComponent } from "./viewtutor/viewtutor.component";

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
                component: AddtutorComponent,
                data: {
                    title: 'Add tutor'
                }
            },
            {
                path: 'edit/:id',
                component: EdittutorComponent,
                data: {
                    title: 'Edit tutor'
                }
            },
            {
                path: 'view/:id',
                component: ViewtutorComponent,
                data: {
                    title: 'View tutor'
                }
            } 

        ]
    },
] as Routes;