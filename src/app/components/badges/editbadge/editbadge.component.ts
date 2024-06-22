import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
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
import { BadgesService } from 'app/Services/badges.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-editbadge',
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
    ],
    templateUrl: './editbadge.component.html',
    styleUrl: './editbadge.component.scss',
})
export class EditbadgeComponent {
    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();

    id: number;
    badgeForm: UntypedFormGroup;

    photoName: string = 'emptyimg.jpg';
    photoUrl: string = this.Config.getPhotoPath('badges');
    photo: string = this.photoUrl + this.photoName;

    constructor(
        private BadgesService: BadgesService,
        private translocoService: TranslocoService,
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
    }

    ngOnInit(): void {
        this.badgeForm = this.formBuilder.group({
            NameBadge: ['', Validators.required],
            DescriptionBadge: ['', Validators.required],
            PhotoBadge: ['', Validators.required],
            Criteria: ['', Validators.required],
        });

        this.BadgesService.getById(this.id).subscribe(
            (res: any) => {
                console.log(res);
                this.badgeForm = this.formBuilder.group({
                    NameBadge: [res[0].NameBadge, Validators.required],
                    DescriptionBadge: [
                        res[0].DescriptionBadge,
                        Validators.required,
                    ],
                    PhotoBadge: [res[0].PhotoBadge, Validators.required],
                    Criteria: [res[0].Criteria, Validators.required],
                });
                this.photo = this.photoUrl + res[0].ProfilePicture;
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error Connexion Server');
                }
            }
        );
    }

    uploadPhoto(event: any): void {
        const file = event.target.files[0];
        const formaData: FormData = new FormData();
        formaData.append('uploadedFile', file, file.name);
        this.BadgesService.uploadPhoto(formaData).subscribe((data: any) => {
            console.log(data);
            this.photoName = data.toString();
            this.photo = this.photoUrl + this.photoName;
        });
    }

    submit() {
        const IdBadge = Number(this.id);
        
        const NameBadge = this.badgeForm.value['NameBadge'];
        //alert(FirstName);
        const DescriptionBadge = this.badgeForm.value['DescriptionBadge'];
        //alert(LastName);
        const Criteria = this.badgeForm.value['Criteria'];
        //alert(Username);
        const PhotoBadge = this.photoName;

        const val = {
            IdBadge,
            NameBadge,
            DescriptionBadge,
            Criteria,
            PhotoBadge,
        }; // Order selon Model BackEnd
        console.log(val);

        this.BadgesService.update(val).subscribe((result: any) => {
            console.log(result);
            if (result.StatusCode == 302) {
                // duplicated
                alert('Error: this badge name already exists');
            } else if (result.StatusCode == 305) {
                alert('Error: this badge description number already exists');
            } else if (result.StatusCode == 202) {
                this.router.navigateByUrl('dashboard/badges');
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
                    alert('Error: Connexion Server or Session');
                }
            };
    }
}
