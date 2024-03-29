import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-addtutor',
  standalone: true,
  imports: [
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
  templateUrl: './addtutor.component.html',
  styleUrl: './addtutor.component.scss'
})
export class AddtutorComponent {
  //Translator
  constructor(private translocoService: TranslocoService) {
    // // this.translocoService.setActiveLang('en'); // Set the initial language
    // this.translocoService.load('en').subscribe(() => {
    //     this.translocoService.setActiveLang('en'); // Set the initial language
    // });
}

emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
]);

FirstNameFormControl = new FormControl('', [Validators.required]);

LastNameFormControl = new FormControl('', [Validators.required]);
contactNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'), // Only allow numeric characters
    Validators.minLength(8), // Assuming a minimum length of 8 characters
    Validators.maxLength(8), // Assuming a maximum length of 9 characters
]);
qualificationsFormControl = new FormControl('', [Validators.required]);
teachingExperienceFormControl = new FormControl('', [Validators.required]);
specialityFormControl = new FormControl('', [Validators.required]);
RequiredFormControl = new FormControl('', [Validators.required]);
BirthdateFormControl = new FormControl('', [Validators.required]);
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
}