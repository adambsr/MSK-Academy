import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from 'app/Services/login.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable, of, switchMap } from 'rxjs';



export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);
    var   LoginService : LoginService;

    // Check the authentication status
    // return inject(LoginService).check().pipe(
    //     switchMap((authenticated) =>
    //     {
            // If the user is not authenticated...
            // if ( !authenticated )
            if ( localStorage.getItem('accessToken') == "") {    
            {
                // Redirect to the sign-in page with a redirectUrl param
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                return of(urlTree);
            }

            // Allow the access
            return of(true);
        // }),
    // );
};
}

// export class AuthGuard implements CanActivate {

//     constructor(public authService: LoginService, public router: Router){}
  
//     canActivate(
//       route: ActivatedRouteSnapshot,
//       state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
//         if (this.authService.isLoggedIn !== true) {
//           console.log("Access not allowed!");
          
//                  const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
//                  const urlTree = this.router.parseUrl(`sign-in?${redirectURL}`);
//                  //this.router.navigate(['dahboard'])
//                   return of(urlTree);
//         }
        
//         return true;
//     }
   
    
//   }
