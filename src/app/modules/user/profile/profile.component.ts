import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  email: any;
  userForm: FormGroup;
  isDesabled: boolean = true;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  resetEmail = new FormControl('', [Validators.required, Validators.email]);
  resetError;

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      companyName: [''],
      mobileNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      street: [''],
      zip: ['', [Validators.minLength(6), Validators.maxLength(10)]]
    });

    // disable form after 2s
    this.userForm.disable();
    this.userData();
  }

  userData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.email = user.email;
        this.db
          .collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe((data: any) => {
            delete data.isCreator;
            delete data.email;
            delete data.displayName;
            delete data.uid;
            delete data.roles;
            delete data.likedEvents;
            delete data.isAdmin;
            delete data.creatorVerified;
            this.user = { ...this.user, ...data };
            for (const field in this.userForm.controls) {
              if (this.user[field] === undefined) {
                this.user[field] = null;
              }
            }
            this.userForm.setValue(this.user);
          });
      }
    });
  }

  disableInput() {
    this.userForm.enable();
    this.isDesabled = false;
  }

  onSubmit() {
    this.userForm.disable();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.db
          .collection('users')
          .doc(user.uid)
          .update({
            ...this.userForm.value
          });
      }
    });

    this.isDesabled = true;
  }

  sendEmail() {
    this.afAuth.sendPasswordResetEmail(this.resetEmail.value).then(
      () => {
        this.resetError = 'Please check your email.';
      },
      err => {
        this.resetError = err;
      }
    );
  }
}
