import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslocoService, TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgClass } from '@angular/common';

@Component({
    selector: 'app-addestablishment',
    standalone: true,
    templateUrl: './addestablishment.component.html',
    styleUrls: ['./addestablishment.component.scss'],
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
        CommonModule
    ],
})
export class AddestablishmentComponent {
    //Translator
    constructor(private translocoService: TranslocoService) {
        // this.translocoService.load('en').subscribe(() => {
        //     this.translocoService.setActiveLang('en'); // Set the initial language
        // });
    }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    ContactNameFormControl = new FormControl('', [Validators.required]);

    ContactLastNameFormControl = new FormControl('', [Validators.required]);

    EstablishmentNameFormControl = new FormControl('', [Validators.required]);

    EstablishmentTypeFormControl = new FormControl('', [Validators.required]);

    BirthdateFormControl = new FormControl('', [Validators.required]);

    AddressFormControl = new FormControl('', [Validators.required]);

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
