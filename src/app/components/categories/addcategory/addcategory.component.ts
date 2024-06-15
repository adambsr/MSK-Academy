import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {
    FormControl,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'app/Services/categories.service';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Config } from 'app/Config/Config';

@Component({
    selector: 'app-addcategory',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        TranslocoModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        CommonModule,
    ],
    templateUrl: './addcategory.component.html',
    styleUrl: './addcategory.component.scss',
})
export class AddcategoryComponent implements OnInit {

    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();
    categoryForm: UntypedFormGroup;
    photoName: string = 'emptycategory.jpg';
    photoUrl: string = this.Config.getPhotoPath('categories');
    photo: string = this.photoUrl + this.photoName;

    constructor(
        private CategoriesService: CategoriesService,
        private Router: Router,
        private formBuilder: UntypedFormBuilder,
        private translocoService: TranslocoService
    ) {}

    formFieldHelpers: string[] = [''];
    fixedSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);

    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    selectRole(role: string) {
        // Handle role selection logic here
        console.log('Selected role:', role);
    }

    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            // IdCateg: [''],
            TitleEn: ['', Validators.required],
            TitleFr: [''],
            TitleAr: [''],
            Description: ['', Validators.required],
            CategoryImage: [''],
            Color: [''],
            Type: [''],
            IdParentCateg: [''],
            Active: [1, Validators.required],
        });
    }

    uploadPhoto(event: any): void {
        const file = event.target.files[0];
        const formaData: FormData = new FormData();
        formaData.append('uploadedFile', file, file.name);
        this.CategoriesService.uploadPhoto(formaData).subscribe((data: any) => {
            console.log(data);
            this.photoName = data.toString();
            this.photo = this.photoUrl + this.photoName;
        });
    }

    submit(): void {
        const TitleEn = this.categoryForm.value['TitleEn'];
        const TitleFr = this.categoryForm.value['TitleFr'];
        const TitleAr = this.categoryForm.value['TitleAr'];

        const Description = this.categoryForm.value['Description'];
        const Image = this.photoName;
        const IdParentCateg = Number(0);

        const val = { TitleEn, TitleFr, TitleAr , Description, Image, IdParentCateg }; //selon model BACKEND
        console.log(val);

        this.CategoriesService.addCategory(val).subscribe((result: any) => {
            console.log(result);
            if (result.StatusCode == 302) {
                // duplicated
                alert('Title already exists');
            } else if (result.StatusCode == 202) {
                this.Router.navigateByUrl('dashboard/categories/view/1');
            } else {
                alert(result.StatusCode);
            }
        }),
            (errors: any) => {
                //console.log(errors);
                if (
                    errors.status == 400 ||
                    errors.status == 0 ||
                    errors.status == 404 ||
                    errors.status == 403
                ) {
                    // Bad Request Unauthorized
                    alert('Error Connexion Server or Session');
                }
            };
    }
}
