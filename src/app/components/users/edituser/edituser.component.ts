import { Component } from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TranslocoModule, TranslocoService } from "@ngneat/transloco";
import { Config } from "app/Config/Config";
import { UsersService } from "app/Services/users.service";
import { CountriesService } from "app/Services/countries.service";
import { StatesService } from "app/Services/states.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-edituser',
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
    MatDatepickerModule
  ],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss'
})
export class EdituserComponent {

  public Config: Config = new Config();
  APIUrl: string = this.Config.getAPIPath();

  id: number;
  userForm: UntypedFormGroup;
  
  Countries: any;
  States: any;
  isTutor: boolean = false;
  selectedRole: number;

  photoName: string = "anonymous.jpg";
  photoUrl: string = this.Config.getPhotoPath("users");
  photo: string = this.photoUrl + this.photoName;


  formFieldHelpers: string[] = [""];
  fixedSubscriptInput: FormControl = new FormControl("", [Validators.required]);
  dynamicSubscriptInput: FormControl = new FormControl("", [
    Validators.required,
  ]);

  constructor(
    private UsersService: UsersService,
    private translocoService: TranslocoService,
    private formBuilder: UntypedFormBuilder,
    private CountriesService: CountriesService,
    private StatesService: StatesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    }
    );
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
          alert("Error Connexion Server");
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
          alert("Error Connexion Server");
        }
      }
    );

    this.UsersService.getUserId(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.userForm = this.formBuilder.group({
          FirstName: [res[0].FirstName, Validators.required],
          LastName: [res[0].LastName, Validators.required],
          Username: [res[0].Username],
          Password: [res[0].Password, Validators.required],
          NIC: [res[0].NIC],
          Telephone: [res[0].Telephone, Validators.required],
          Email: [res[0].Email, [Validators.required, Validators.email],],
          BirthDate: [res[0].BirthDate],
          Gender: [res[0].Gender, Validators.required],
          Address: [res[0].Address],
          IdCountry: [res[0].IdCountry, Validators.required],
          IdState: [res[0].IdState],
          IdRole: [res[0].IdRole, Validators.required],
          FacebookId: [""],
          GoogleId: [""],
          RefreshToken: [""],
          CreationDate: [new Date()],
          IsVerified: [null],
          IsPremium: [null],
          PremiumExpiry: [null],
          ProfilePicture: [res[0].ProfilePicture],
          Active: [1, Validators.required],
          Qualifications: [res[0].Qualifications, Validators.required],
          Speciality: [res[0].Speciality, Validators.required],
          TeachingExperience: [res[0].TeachingExperience, Validators.required],
        });
        this.photo = this.photoUrl + res[0].ProfilePicture;
        this.photoName = res[0].ProfilePicture;
        if (res[0].IdRole == 2) {
          this.isTutor = true;
          this.selectedRole = 2;
        }
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
    formaData.append("uploadedFile", file, file.name);
    this.UsersService.uploadPhoto(formaData).subscribe((data: any) => {
      console.log(data);
      this.photoName = data.toString();
      this.photo = this.photoUrl + this.photoName;
    });
  }

  submit() {
    const IdUser = Number(this.id);
    //alert(IdUser)
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
      IdUser,
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