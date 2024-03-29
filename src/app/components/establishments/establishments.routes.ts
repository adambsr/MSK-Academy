import { Routes } from "@angular/router";
import { AddestablishmentComponent } from "./addestablishment/addestablishment.component";
import { EditestablishmentComponent } from "./editestablishment/editestablishment.component";
import { ViewestablishmentComponent } from "./viewestablishment/viewestablishment.component";

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
                component: AddestablishmentComponent,
                data: {
                    title: 'Add establishment'
                }
            },
            {
                path: 'edit/:id',
                component: EditestablishmentComponent,
                data: {
                    title: 'Edit establishment'
                }
            },
            {
                path: 'view/:id',
                component: ViewestablishmentComponent,
                data: {
                    title: 'View establishment'
                }
            } 

        ]
    },
] as Routes;