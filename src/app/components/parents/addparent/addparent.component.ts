import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
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


@Component({
    selector: 'app-addparent',
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
    ],
    templateUrl: './addparent.component.html',
    styleUrl: './addparent.component.scss',
})
export class AddparentComponent {
    //Translator
    constructor(private translocoService: TranslocoService) {
        // // this.translocoService.setActiveLang('en'); // Set the initial language
        // this.translocoService.load('en').subscribe(() => {
        //     this.translocoService.setActiveLang('en'); // Set the initial language
        // });
    }
    parentIDFile: File;

    onFileSelected(event: any) {
        this.parentIDFile = event.target.files[0];
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
