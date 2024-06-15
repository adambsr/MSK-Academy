import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { HelpCenterService } from 'app/modules/admin/apps/help-center/help-center.service';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule, TranslocoModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {

  @ViewChild('supportNgForm') supportNgForm: NgForm;

  alert: any;
  supportForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(
      private formBuilder: UntypedFormBuilder,
      private _helpCenterService: HelpCenterService,
      private translocoService: TranslocoService,
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
      // Create the support form
      this.supportForm = this.formBuilder.group({
          username   : ['', Validators.required],
          email  : ['', [Validators.required, Validators.email]],
          subject: ['', Validators.required],
          message: ['', Validators.required],
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Clear the form
   */
  clearForm(): void
  {
      // Reset the form
      this.supportNgForm.resetForm();
  }

  /**
   * Send the form
   */
  sendForm(): void
  {
      // Send your form here using an http request
      console.log('Your message has been sent!');

      // Show a success message (it can also be an error message)
      // and remove it after 5 seconds
      this.alert = {
          type   : 'success',
          message: 'Your request has been delivered! A member of our support staff will respond as soon as possible.',
      };

      setTimeout(() =>
      {
          this.alert = null;
      }, 7000);

      // Clear the form
      this.clearForm();
  }
  
}
