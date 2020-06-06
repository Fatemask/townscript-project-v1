import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  loading = false;
  type: 'login' | 'signup' | 'reset' = 'login';
  serverMessage: string;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
      remember: ['']
    });
  }

  changeType(val) {
    this.type = val;
    this.form.reset();
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }
  get remember() {
    return this.form.get('remember');
  }

  async onSubmit() {
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;
    console.log(this.remember.value);
    try {
      if (this.isLogin) {
        const res = await this.afAuth.signInWithEmailAndPassword(email, password);
        if (res) this.router.navigate(['']);
        if (this.remember.value) {
          localStorage.setItem('uid', JSON.stringify(res.user));
        }
        // console.log(res.user.email);
        // console.log(res.user.uid);
      }
      if (this.isSignup) {
        const res = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        if (this.remember.value) {
          localStorage.setItem('uid', JSON.stringify(res.user.uid));
        }
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check Your Email';
      }
    } catch (err) {
      this.serverMessage = err;
    }
    this.loading = false;
  }
}