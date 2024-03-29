import { Routes } from "@angular/router";
import { AdduserComponent } from "./adduser/adduser.component";
import { EdituserComponent } from "./edituser/edituser.component";
import { ViewuserComponent } from "./viewuser/viewuser.component";

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
                component: AdduserComponent,
                data: {
                    title: 'Add user'
                }
            },
            {
                path: 'edit/:id',
                component: EdituserComponent,
                data: {
                    title: 'Edit user'
                }
            },
            {
                path: 'view/:id',
                component: ViewuserComponent,
                data: {
                    title: 'View user'
                }
            } 
        ]
    },
] as Routes;