import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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
import { Router } from '@angular/router';
import { BadgesService } from 'app/Services/badges.service';

@Component({
  selector: 'app-addbadge',
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
  templateUrl: './addbadge.component.html',
  styleUrl: './addbadge.component.scss'
})
export class AddbadgeComponent {
  public Config: Config = new Config();
  APIUrl: string = this.Config.getAPIPath();

  photoName: string = 'emptyimg.jpg';
  photoUrl: string = this.Config.getPhotoPath('badges');
  photo: string = this.photoUrl + this.photoName;

  badgeForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private badgesService: BadgesService,
    private translocoService: TranslocoService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.badgeForm = this.formBuilder.group({
      NameBadge: ['', Validators.required],
      DescriptionBadge: ['', Validators.required],
      Criteria: ['', Validators.required],
      PhotoBadge: [''],
      Active: [1, Validators.required],
    });
  }

  uploadPhoto(event: any): void {
    const file = event.target.files[0];
    const formaData: FormData = new FormData();
    formaData.append('uploadedFile', file, file.name);
    this.badgesService.uploadPhoto(formaData).subscribe((data: any) => {
      console.log(data);
      this.photoName = data.toString();
      this.photo = this.photoUrl + this.photoName;
    });
  }

  submit() {
    const NameBadge = this.badgeForm.value['NameBadge'];
    //alert(NameBadge);
    const DescriptionBadge = this.badgeForm.value['DescriptionBadge'];
    //alert(DescriptionBadge);
    const Criteria = this.badgeForm.value['Criteria'];
    //alert(Criteria);
    const PhotoBadge = this.photoName;
    //alert(PhotoBadge);
    const Active = 1;
    
    const val = {
      NameBadge,
      DescriptionBadge,
      Criteria,
      PhotoBadge,
      // Active,
    };
    console.log(val);

    this.badgesService.add(val).subscribe((result: any) => {
      console.log(result);
      if (result.StatusCode == 302) {
        // duplicated
        alert('Error Email already exists');
      } else if (result.StatusCode == 305) {
        alert('Error Telephone number already exists');
      } else if (result.StatusCode == 202) {
        this.Router.navigateByUrl('dashboard/badges/view/1');
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
