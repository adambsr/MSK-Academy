import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Config } from '../Config/Config';
import { Signup } from '../Models/signup';
import { Login } from '../Models/login';
import { Observable, of } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    public _authenticated: boolean = false;

    public Config: Config = new Config();
    register: any;
    currentUserValue: any;
    accessToken: any;

    constructor(private http: HttpClient, public router: Router) {}
    // ---------------------------------
    path: string = this.Config.getServerPath();
    APIUrl: string = this.Config.getAPIPath();
    PhotoUrl: string = this.Config.getPhotoPath('users');
    loginPath: string = this.Config.CRUDAPIPath('login');
    SignUpPath: string = this.Config.CRUDAPIPath('signup');
    ResetPath: string = this.Config.CRUDAPIPath('changepass');

    ConfirmresetPass(val: any) {
        //SendMailcode/
        return this.http.put(this.APIUrl + 'Auth/changePass/', val);
    }
    resetPass(email: string) {
        //SendMailcode/
        return this.http.post<any>(
            this.APIUrl + 'Auth/ResendConfirmation?email=' + email,
            email
        );
    }
    forgetpass(Email: string) {
        //console.log(this.ResetPath);

        return this.http.put(this.ResetPath, Email).subscribe(
            (res: any) => {
                console.log(res);

                if (res.statusCode == 302) {
                    alert(res.statusMessage); //email not existe
                } else if (res.statusCode == 1000) {
                    alert(res.statusMessage);
                    this.router.navigate(['/auth/login']);
                }
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error Connexion Server');
                } else if (error.status == 401) {
                    alert('Error Unauthorized Email Exist');
                } else if (error.status == 403) {
                    alert('Error Forbidden');
                } else if (error.status == 404) {
                    alert('Error Email Exist');
                } else {
                    alert(error.status);
                }
            },
            () => {
                //console.log("Finally clause");
            }
        );
    }

    signUp(user: Signup) {
        console.log(this.SignUpPath);
        console.log(user);

        return this.http.post(this.SignUpPath, user).subscribe(
            (res: any) => {
                console.log(res);
                if (res.StatusCode == 302) {
                    alert(res.StatusMessage); //email not existe
                } else if (res.StatusCode == 303) {
                    alert(res.StatusMessage); // email exist
                } else if (res.StatusCode == -100) {
                    alert('Exception Please Contact Technical Support');
                } else if (res.StatusCode == 1000) {
                    alert('Registred Successful');

                    this.router.navigate(['sign-in']);
                }
            },
            (error: any) => {
                console.log(error);
                if (error.status == 400 || error.status == 0) {
                    // Bad Request
                    alert('Error Connexion Server');
                } else if (error.status == 401) {
                    alert('Error Unauthorized Email Exist');
                } else if (error.status == 403) {
                    alert('Error Forbidden');
                } else if (error.status == 404) {
                    alert('Error Email Exist');
                } else {
                    alert(error.status);
                }
            },
            () => {
                //console.log("Finally clause");
            }
        );
    }
    // Sign-in   // role : 1: Employee / 2: PROF / 3: Student
    signIn(user: Login) {
        console.log('Path = ' + this.loginPath);
        console.log("user", user);
        return this.http.post<any>(this.loginPath, user).subscribe(
            (res: any) => {
                console.log("res", res);
                if (res.StatusCode == 302) {
                    alert(res.StatusMessage); //email not existe
                } else if (res.StatusCode == 303) {
                    alert(res.StatusMessage); // incorrect pass
                } else if (res.StatusCode == -100) {
                    alert('Exception Please Contact Technical Support');
                } else if (res.StatusCode == 1000) {
                    localStorage.setItem('accessToken', res.accessToken);
                    this.accessToken = res.accessToken;
                    localStorage.setItem('Email', res.user.Email);
                    localStorage.setItem('FirstName', res.user.FirstName);
                    localStorage.setItem('LastName', res.user.LastName);
                    localStorage.setItem('photo', res.user.Photo);
                    localStorage.setItem('UserId', res.user.UserId);
                    localStorage.setItem('IdRole', res.user.IdRole);
                    // localStorage.setItem('IdCountry', res.user.IdCountry);
                    // localStorage.setItem('BirthDate', res.user.BirthDate);

                    localStorage.setItem('status', 'online');
                    this._authenticated = true;
                    if(res.user.IdRole === 4 ){
                        this.router.navigate(['dashboard/users']);

                    }else {
                        this.router.navigate(['dashboard/profile/' + res.user.UserId]);
                    }
                    

                } else {
                    alert('impossible !');

                    //console.log(res);
                    //localStorage.setItem('accessToken', res.accessToken);
                    //this.router.navigate(['dashuser']);

                    //localStorage.setItem('userid', res.user[0].id);
                    //localStorage.setItem('tokenn', res.user[0])
                }

                // this.Config['token'] = "Bearer "+res.token;
                //localStorage.setItem('userid', res.user[0].id);
                //localStorage.setItem('tokenn', res.user[0].id_role);
                //localStorage.setItem('userfullname', res.user[0].fullname);
                //localStorage.setItem('photo', res.photo);
                //localStorage.setItem('token', res.token);

                // this._authenticated= true;
            },
            (error: any) => {
                console.log(error);
                if (error.status == 404) {
                    alert('Login or Password not mutch');
                }
                if (
                    error.status == 400 ||
                    error.status == 0 ||
                    error.status == 403
                ) {
                    alert('Error Server Connexion');
                }
            },
            () => {
                //console.log("Finally clause");
            }
        );
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }

    get isLoggedIn(): boolean {
        //TODO: Securité Front-End on peu utilisé Variable dans local Storage pour Accéder dans le site
        let authToken = localStorage.getItem('accessToken');
        return authToken !== null ? true : false;
    }

    doLogout() {
        let removeToken = localStorage.removeItem('accessToken');
        localStorage.clear();
        this._authenticated = false;
        if (removeToken == null) {
            this.router.navigate(['sign-in']);
        }
    }
    uploadPhoto(val: any): any {
        return this.http.post(this.APIUrl + 'Auth/SaveFile', val);
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken()
    // Observable<any>
    {
        // // Sign in using the token
        // return this._httpClient.post('api/auth/sign-in-with-token', {
        //     accessToken: this.accessToken,
        // }).pipe(
        //     catchError(() =>

        //         // Return false
        //         of(false),
        //     ),
            // switchMap((response: any) =>
            // {
            //     // Replace the access token with the new one if it's available on
            //     // the response object.
            //     //
            //     // This is an added optional step for better security. Once you sign
            //     // in using the token, you should generate a new one on the server
            //     // side and attach it to the response object. Then the following
            //     // piece of code can replace the token with the refreshed one.
            //     if ( response.accessToken )
            //     {
            //         this.accessToken = response.accessToken;
            //     }

            //     // Set the authenticated flag to true
            //     this._authenticated = true;

            //     // Store the user on the user service
            //     this._userService.user = response.user;

            //     // Return true
            //     return of(true);
            // }),
        // );
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        // return this.signInUsingToken();
    }
    
    // Error
}

function subscribe(arg0: (res: any) => void) {
    throw new Error('Function not implemented.');
}
