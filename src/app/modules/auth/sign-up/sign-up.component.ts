import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { LoginService } from 'app/Services/login.service';
@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,MatButtonModule,
        MatSelectModule,
        MatOptionModule]
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    hide = true; // Initial state of the password input is hidden
    toggleHide(): void {
        this.hide = !this.hide;
    }
    
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private LoginService: LoginService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        /*this.signUpForm = this._formBuilder.group({
                FirstName      : ['', Validators.required],
                LastName      : ['', Validators.required],
                email     : ['mohamedsamikhiari@gmail.com', [Validators.required, Validators.email]],
                password  : ['123', Validators.required],
                country: ['', Validators.required] ,
                agreements: ['', Validators.requiredTrue],
            },
        );*/
        this.signUpForm = this._formBuilder.group({
            FirstName      : ['', Validators.required],
            LastName      : ['', Validators.required],
            Email     : ['', [Validators.required, Validators.email]],
            Password  : ['', Validators.required],
            IdRole: ['', Validators.required],
            agreements: ['', Validators.required],
        },
    );
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        //this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;
        this.LoginService.signUp(this.signUpForm.value);
        // Sign up
        /*this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) =>
                {
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) =>
                {
                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try again.',
                    };

                    // Show the alert
                    this.showAlert = true;
                },
            );*/
    }
}
