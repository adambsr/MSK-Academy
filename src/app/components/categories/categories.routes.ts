import { Routes } from "@angular/router";
import { AddcategoryComponent } from "./addcategory/addcategory.component";
import { EditcategoryComponent } from "./editcategory/editcategory.component";
import { ViewcategoryComponent } from "./viewcategory/viewcategory.component";

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
                component: AddcategoryComponent,
                data: {
                    title: 'Add category'
                }
            },
            {
                path: 'edit/:id',
                component: EditcategoryComponent,
                data: {
                    title: 'Edit category'
                }
            },
            {
                path: 'view/:id',
                component: ViewcategoryComponent,
                data: {
                    title: 'View category'
                }
            } 

        ]
    },
] as Routes;