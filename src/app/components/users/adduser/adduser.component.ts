import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Config } from 'app/Config/Config';
import { UsersService } from 'app/Services/users.service';
import { CountriesService } from 'app/Services/countries.service';
import { StatesService } from 'app/Services/states.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-adduser',
    standalone: true,
    imports: [MatIconModule, TranslocoModule, FormsModule, MatFormFieldModule, NgClass, MatInputModule, TextFieldModule, ReactiveFormsModule, MatButtonToggleModule, MatButtonModule, MatSelectModule, MatOptionModule, MatChipsModule, MatDatepickerModule, CommonModule,],
    templateUrl: './adduser.component.html',
    styleUrl: './adduser.component.scss',
})
export class AdduserComponent {

    public Config: Config = new Config();

    userForm: UntypedFormGroup;
    Countries: any;
    States: any;
    selectedRole: string = '';

    photoName: string = 'anonymous.jpg';
    photoUrl: string = this.Config.getPhotoPath('users');
    photo: string = this.photoUrl + this.photoName;

    constructor(
        private UsersService: UsersService,
        private translocoService: TranslocoService,
        private formBuilder: UntypedFormBuilder,
        private CountriesService: CountriesService,
        private StatesService: StatesService,
        private Router: Router
    ) { }

    hide = true; // Initial state of the password input is hidden
    toggleHide(): void {
        this.hide = !this.hide;
    }

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
        console.log('Selected role:', role);
    }

    onRoleChange(role: string) {
        this.selectedRole = role;
    }

    ngOnInit() {
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
                    alert('Error Connexion Server');
                }
            }
        );

        this.StatesService.getStates().subscribe(
            (res: any) => {
                this.States = res;
                //this.Role=res;
                console.log(res);
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error Connexion Server');
                }
            }
        );

        this.userForm = this.formBuilder.group({
            FirstName: [null, Validators.required],
            LastName: [null, Validators.required],
            Username: [null, Validators.required],
            Password: [null, Validators.required],
            NIC: [null, Validators.required],
            Telephone: [null, Validators.required],
            Email: [null, [Validators.required, Validators.email]],
            BirthDate: [null, Validators.required],
            Gender: [null, Validators.required],
            Address: [null, Validators.required],
            IdCountry: [null],
            IdState: [null],
            IdRole: [null, Validators.required],
            FacebookId: [''],
            GoogleId: [''],
            RefreshToken: [''],
            CreationDate: [new Date()],
            IsVerified: [null],
            IsPremium: [null],
            PremiumExpiry: [null],
            ProfilePicture: [''],
            TeachingExperience: [null],
            Qualifications: [null],
            Speciality: [null],
            Active: [1, Validators.required],
        });
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
        const FirstName = this.userForm.value['FirstName'];
        //alert(FirstName);
        const LastName = this.userForm.value['LastName'];
        //alert(LastName);
        const Username = this.userForm.value['Username'];
        //alert(Username);
        const Password = this.userForm.value['Password'];
        //alert(Password);
        const NIC = this.userForm.value['NIC'];
        //alert(NIC);
        const Telephone = this.userForm.value['Telephone'];
        //alert(Telephone);
        const Email = this.userForm.value['Email'];
        //alert(Email);
        const BirthDate = this.userForm.value['BirthDate'];
        //alert(BirthDate);
        const Gender = this.userForm.value['Gender'];
        //alert(Gender);
        const Address = this.userForm.value['Address'];
        //alert(Address);
        const IdCountry = Number(this.userForm.value['IdCountry']);
        // alert(IdCountry);
        const IdState = Number(this.userForm.value['IdState']);
        // alert(IdState);
        const IdRole = Number(this.userForm.value['IdRole']);
        //alert(Role);
        const ProfilePicture = this.photoName;
        //alert(ProfilePicture)
        const TeachingExperience = this.userForm.value['TeachingExperience'];
        //alert(TeachingExperience);
        const Qualifications = this.userForm.value['Qualifications'];
        //alert(Qualifications);
        const Speciality = this.userForm.value['Speciality'];
        //alert(Speciality);
        const Active = Number(this.userForm.value['Active']);
        //alert(Active);

        const val = {
            Username,
            FirstName,
            LastName,
            Email,
            Password,
            IdRole,
            BirthDate,
            Gender,
            NIC,
            Address,
            IdCountry,
            IdState,
            Telephone,
            ProfilePicture,
            Qualifications,
            Speciality,
            TeachingExperience,
            Active
        };
        console.log(val);

        this.UsersService.addUser(val).subscribe((result: any) => {
            console.log(result);
            if (result.StatusCode == 302) {
                // duplicated
                alert('Email already exists!');
            } else if (result.StatusCode == 305) {
                alert('Telephone number already exists!');
            } else if (result.StatusCode == 202) {
                alert('User added successfully.');
                this.Router.navigateByUrl('dashboard/users/view/1');
            } else {
                alert(result.StatusCode);
            }
        }),
            (errors: any) => {
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