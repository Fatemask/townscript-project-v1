import { Directive, HostListener } from "@angular/core";
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Directive({
    selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
    constructor(private authService: AuthService, private router: Router) { }
    @HostListener('click')
    onclick() {
        this.authService.googleLogin()
        .then(res => {
            this.router.navigate(['']);
        })
    }
}