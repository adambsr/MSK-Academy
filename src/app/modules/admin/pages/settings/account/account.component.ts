import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Config } from 'app/Config/Config';
import { CountriesService } from 'app/Services/countries.service';
import { UsersService } from 'app/Services/users.service';

@Component({
    selector: 'settings-account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule],
})
export class SettingsAccountComponent implements OnInit {
    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();

    photoName: string = 'anonymous.jpg';
    photoUrl: string = this.Config.getPhotoPath('users');
    photo: string = this.photoUrl;

    id: number;
    accountForm: UntypedFormGroup;
    Countries: any;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private UsersService: UsersService,
        private translocoService: TranslocoService,
        private CountriesService: CountriesService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params: Params) => {
            this.id = Number(params['id']);
        });
    }

    ngOnInit(): void {
        // Create the form
        this.accountForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            // about: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            country: ['', Validators.required],
        });

        this.CountriesService.getCountries().subscribe(
            (res: any) => {
                this.Countries = res;
                //this.Role=res;
                console.log(res);
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert("Error Connexion Server");
                }
            }
        );

        this.UsersService.getUserId(this.id).subscribe(
            (res: any) => {
                console.log(res);
                this.accountForm = this._formBuilder.group({
                    firstName: [res[0].firstName, Validators.required],
                    lastName: [res[0].lastName, Validators.required],
                    username: [res[0].username],
                    // about: [res[0].about, Validators.required],
                    email: [res[0].email],
                    phone: [res[0].phone, Validators.required],
                    country: [res[0].country, [Validators.required, Validators.email],],
                });
                this.photo = this.photoUrl + res[0].ProfilePicture;
                this.photoName = res[0].ProfilePicture;
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert("Error Connexion Server");
                }
            }
        );
    }

    uploadPhoto(event: any): void {
        const file = event.target.files[0];
        const formaData: FormData = new FormData();
        formaData.append('uploadedFile', file, file.name);
        this.UsersService.uploadPhoto(formaData).subscribe((data: any) => {
            console.log(data);
            this.photoName = data.toString();
            this.photo = this.photoUrl + this.photoName;
        });
    }

    submit() {
        const IdUser = Number(this.id);
        const firstName = this.accountForm.value['firstName'];
        const lastName = this.accountForm.value['lastName'];
        const username = this.accountForm.value['username'];
        // const about = this.accountForm.value['about'];
        const email = this.accountForm.value['email'];
        const phone = this.accountForm.value['phone'];
        const country = this.accountForm.value['country'];

        const val = {
            IdUser,
            firstName,
            lastName,
            username,
            // about,
            email,
            phone,
            country,
        };
        console.log(val);

        this.UsersService.updateUser(val).subscribe((result: any) => {
            console.log(result);
            if (result.StatusCode == 302) {
                // duplicated
                alert("Error Email already exists");
            } else if (result.StatusCode == 305) {
                alert("Error Telephone number already exists");
            } else if (result.StatusCode == 202) {
                this.router.navigateByUrl("dashboard/users");
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
                    alert("Error Connexion Server or Session");
                }
            };
    }
}
