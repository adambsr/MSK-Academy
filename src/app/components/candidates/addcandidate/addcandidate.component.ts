import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
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

@Component({
    selector: 'app-addcandidate',
    standalone: true,
    imports: [
        MatIconModule,
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
        TranslocoModule,
        CommonModule,
    ],
    templateUrl: './addcandidate.component.html',
    styleUrl: './addcandidate.component.scss',
})
export class AddcandidateComponent {
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

    UsernameFormControl = new FormControl('', [Validators.required]);

    BirthdateFormControl = new FormControl('', [Validators.required]);

    AddressFormControl = new FormControl('', [Validators.required]);

    fieldOfStudyFormControl = new FormControl('', [Validators.required]);

    contactNumberFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'), // Only allow numeric characters
        Validators.minLength(8), // Assuming a minimum length of 8 characters
        Validators.maxLength(8), // Assuming a maximum length of 9 characters
    ]);

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
}
