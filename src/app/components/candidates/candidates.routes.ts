import { Routes } from "@angular/router";
import { AddcandidateComponent } from "./addcandidate/addcandidate.component";
import { ViewcandidateComponent } from "./viewcandidate/viewcandidate.component";
import { EditcandidateComponent } from "./editcandidate/editcandidate.component";

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
                component: AddcandidateComponent,
                data: {
                    title: 'Add professor'
                }
            },
            {
                path: 'edit/:id',
                component: EditcandidateComponent,
                data: {
                    title: 'Edit professor'
                }
            },
            {
                path: 'view/:id',
                component: ViewcandidateComponent,
                data: {
                    title: 'View professor'
                }
            } 

        ]
    },
] as Routes;