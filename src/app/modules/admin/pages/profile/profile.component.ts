import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { FuseCardComponent } from '@fuse/components/card';
import { TranslocoService } from '@ngneat/transloco';
import { Config } from 'app/Config/Config';
import { Users } from 'app/Models/users';
import { UsersService } from 'app/Services/users.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, FuseCardComponent, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, TextFieldModule, MatDividerModule, MatTooltipModule, NgClass],
})
export class ProfileComponent implements OnInit{

    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();

    id: number;
    user: Users;
    photoName: string = "anonymous.jpg";
    photoUrl: string = this.Config.getPhotoPath("users");
    photo: string = this.photoUrl + this.photoName;
    isLoading: boolean = true;

    constructor(
        private usersService: UsersService,
        private translocoService: TranslocoService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {
       
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id']; 
            this.getUser();
        });
    }

   /* async getUser(){
        var tempUser = await this.usersService.getUserId(this.id).toPromise();
        console.log("tempUser", tempUser);
        this.user = tempUser;
        console.log("user", this.user);
        // this.cdr.detectChanges(); // Manually trigger change detection

        
        .subscribe(
            (user: Users) => {
                console.log(user);
                this.user = user;
                
            },
            (error) => {
                console.log("Error getting user for this id: " + this.id);
                console.error(error);
            }
        );
        
    }*/
    getUser() {
        this.usersService.getUserId(this.id).subscribe(
            (user: Users) => {
                console.log(user);
                this.user = user;
                this.isLoading = false; // Set loading state to false once data is fetched
            },
            (error) => {
                console.log("Error getting user for this id: " + this.id);
                console.error(error);
                this.isLoading = false; // Handle error state if needed
            }
        );
    }

    // Fetch tutor image
   getProfilePicture(ProfilePicture: String): string {
        // return `${this.Config.getPhotoPath('users')}${ProfilePicture}`;
        return `${this.Config.getPhotoPath('users')}${localStorage.getItem('photo')}`;
    }

    getItemFromLocalStorage(item: string): string  { 
        return localStorage.getItem(item);
    }
   
}
