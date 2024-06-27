import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
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
import { CategoriesService } from 'app/Services/categories.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-editcategory',
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
        MatSlideToggleModule,
    ],
    providers: [
        {provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS , useValue: {disableToggleValue: false, disableDragValue: true}},
      ],
    templateUrl: './editcategory.component.html',
    styleUrl: './editcategory.component.scss',
})
export class EditcategoryComponent implements OnInit {
    IdCateg: number;
    id: number;
    TitleEn: String;
    // TitleFr: String;
    // TitleAr: String;
    Description: String;
    CategoryImage: String;
    // Color: String;
    // Type: Number;
    IdParentCateg: number;

    ToogleActive: boolean = false;
    toggleValue : boolean  = false;
    toggleControl: FormControl;

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
        private translocoService: TranslocoService,
        private route: ActivatedRoute, 
    ) {
        this.route.params.subscribe((params: Params) => {
            this.id = Number(params['id']);}
            );
    }

    ngOnInit(): void {

        this.categoryForm = this.formBuilder.group({
            // IdCateg: [''],
            TitleEn: ['', Validators.required],
            TitleFr: [''],
            TitleAr: [''],
            Description: ['', Validators.required],
            Image: [''],
            //Color: [''],
            //Type: [''],
            //IdParentCateg: [''],
            //Active: [false, Validators.required],
        });

        this.toggleControl = new FormControl(false);
       

        this.CategoriesService.getEditCategory(this.id).subscribe((data) => {
            console.log(data);

            if(data[0].Active == 1){
                // alert('Mrigla');
                this.toggleControl.setValue(true);
                this.toggleValue = true;
                this.ToogleActive = true;
            }else{
                this.toggleControl.setValue(false);
                this.ToogleActive = false;
                // alert("mchouma");
            }
            // alert(this.ToogleActive);
            this.categoryForm = this.formBuilder.group({
                // IdCateg: [''],
                TitleEn: [data[0].TitleEn, Validators.required],
                TitleFr: [data[0].TitleFr],
                TitleAr: [data[0].TitleAr],
                Description: [data[0].Description, Validators.required],
                Image: [data[0].Image],
                //Color: [''],
                //Type: [''],
                //IdParentCateg: [''],
                //Active: [this.ToogleActive],
            });

            this.photo = this.photoUrl + data[0].Image;

            // this.TitleEn = data[0].TitleEn;
            // this.Description = data[0].Description;
            // this.CategoryImage = data[0].CategoryImage;
            // this.IdParentCateg = data[0].IdParentCateg;
        });

        
    }

   // mySlideToggle= new FormControl(this.ToogleActive,[Validators.required]);


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

    changeActive(active){
       this.ToogleActive = !this.ToogleActive;
       // alert(this.ToogleActive);
    }

    submit(): void {
        //alert(this.categoryForm.value['Active']);
        // alert(this.ToogleActive);
        const IdCateg = Number(this.id);
        const TitleEn = this.categoryForm.value['TitleEn'];
        const TitleFr = this.categoryForm.value['TitleFr'];
        const TitleAr = this.categoryForm.value['TitleAr'];
        const Description = this.categoryForm.value['Description'];
        const Image = this.categoryForm.value['Image'];
        const IdParentCateg = Number(0);
        const Type = Number(0);
        //const Active = Number((this.categoryForm.value['Active']==true)?1:0);
        const Active = Number((this.ToogleActive==true)?1:0);

        const val = {
            IdCateg,
            TitleEn,
            TitleFr,
            TitleAr,
            Description,
            Image,
            IdParentCateg,
            Type,
            Active
        };
        console.log(val);

        this.CategoriesService.updateCategory(val).subscribe((result: any) => {
            console.log(result);
            if (result.StatusCode == 302) {
                // duplicated
                alert('Title already exists');
            } else if (result.StatusCode == 1000) {
                this.Router.navigateByUrl('dashboard/categories/view/1');
            } else {
                alert(result.StatusCode);
            }
        }),
            (errors: any) => {
                console.log(errors);
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
