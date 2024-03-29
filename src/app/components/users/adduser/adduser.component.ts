import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
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

@Component({
    selector: 'app-adduser',
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
    templateUrl: './adduser.component.html',
    styleUrl: './adduser.component.scss',
})
export class AdduserComponent {
    //Translator
    constructor(private translocoService: TranslocoService) {
        // this.translocoService.setActiveLang('en'); // Set the initial language
        // this.translocoService.load('en').subscribe(() => {
        //     this.translocoService.setActiveLang('en'); // Set the initial language
        // });
    }

    hide = true; // Initial state of the password input is hidden
    toggleHide(): void {
        this.hide = !this.hide;
    }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    FirstNameFormControl = new FormControl('', [Validators.required]);

    LastNameFormControl = new FormControl('', [Validators.required]);

    UsernameFormControl = new FormControl('', [Validators.required]);

    PasswordFormControl = new FormControl('', [Validators.required]);

    BirthdateFormControl = new FormControl('', [Validators.required]);

    AddressFormControl = new FormControl('', [Validators.required]);

    contactNumberFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'), // Only allow numeric characters
        Validators.minLength(8), // Assuming a minimum length of 8 characters
        Validators.maxLength(8), // Assuming a maximum length of 9 characters
    ]);

    NICFormControl = new FormControl('', [
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
}
