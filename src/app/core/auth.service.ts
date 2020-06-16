import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.getUser();
  }

  /** Get auth data, then get firestore user document || null */
  getUser() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return null;
        }
      })
    );
  }


  /** Login with google */
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
  }

  /** Login with email */
  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigate[''];
      })
  }

  /** SignUp with email */
  signUp(firstName, lastName, email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        let newUser:any = credential.user;
        newUser = {
          ...newUser,
          firstName: firstName,
          lastName: lastName
        }
        this.updateUserData(credential.user);
        this.router.navigate[''];
      })
  }

  signOut() {
    this.afAuth.signOut()
  }

  /** Password reset email */
  passwordReset(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef = this.afs.collection<User>('users').doc(user.uid);
    const data: User = {
      firstName: null,
      lastName: null,
      companyName: null,
      mobileNumber: null,
      street: null,
      zip: null,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true })
  }


  /** Role-based Authorization */
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  /** determines if user has matching role */
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }
}
