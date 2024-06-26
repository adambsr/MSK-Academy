import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
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
import { UsersService } from 'app/Services/users.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, FuseCardComponent, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, TextFieldModule, MatDividerModule, MatTooltipModule, NgClass],
})
export class ProfileComponent {

    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();

    id: number;
    user: any;
    photoName: string = "anonymous.jpg";
    photoUrl: string = this.Config.getPhotoPath("users");
    photo: string = this.photoUrl + this.photoName;

    constructor(
        private usersService: UsersService,
        private translocoService: TranslocoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((Params: Params) => {
            this.id = Params['id'];
          });
    }

    ngOnInit() {
        this.getUser();
    }

    getUser(){

    }

    // Fetch tutor image
    getTutorPicture(ProfilePicture: string): string {
        return `${this.Config.getPhotoPath('users')}${ProfilePicture}`;
    }
}
