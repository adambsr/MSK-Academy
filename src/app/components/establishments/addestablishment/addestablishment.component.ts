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
import { NgClass } from '@angular/common';

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
    phoneNumberFormControl = new FormControl('', [Validators.required]);

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
