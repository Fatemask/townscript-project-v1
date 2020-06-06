import { Directive, HostListener } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';

@Directive({
    selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
    constructor(private afAuth: AngularFireAuth) { }
    @HostListener('click')
    onclick() {
        this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(res => {
            localStorage.setItem('uid', JSON.stringify(res.user.uid));
        })
    }
}