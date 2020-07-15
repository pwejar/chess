import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ServemeService } from './service/serveme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  logss = 'Create account';
  logss1 = 'login';
  sign = 'Sign in';
  email = '';
  pass = '';
  passC = '';
  passwordType = 'password';
  passwordIcon = 'eye-off';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private serveMe: ServemeService
  ) {
    this.initializeApp();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
  passMatch() {
    if (this.pass !== this.passC) {
      this.serveMe.showAlert('Password missmatch', 2);
      return false;
    }
    return true;
  }
  validatePass() {
    if (this.logss1 === 'Create account') {
    let strength = 0;
    if (this.pass.match(/[a-z]+/)){
        strength += 1;
    }
    if (this.pass.match(/[A-Z]+/)){
        strength += 1;
    }
    if (this.pass.match(/[0-9]+/)){
        strength += 2;
    }
    if (this.pass.match(/[$@#&!]+/)){
        strength += 2;

        }
    if (this.pass.length < 6){
    this.serveMe.showAlert('Strong passwords have at least 6 characters and a mix of letters and numbers', 2);
    return false;
    }
    if (strength < 3) {
    this.serveMe.showAlert('Strong passwords have at least 6 characters and a mix of letters and numbers', 2);
    return false;
    }
    return true;

    }
  }
  validateEmail(mail) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true);
    }
   if (this.email !== '') {
      this.serveMe.showAlert('Kindly Input Email Correctly', 3);
    }
   return (false);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  login(ko: number){
    switch (ko) {
      case 1:
        this.logss = 'Login';
        this.logss1 = 'Reset Password';
        break;
      case 2:
        if (this.logss === 'Create account') {
          this.logss = 'Login';
          this.logss1 = 'Create account';
          this.sign = 'Sign up';
        } else {
          this.logss = 'Create account';
          this.logss1 = 'login';
          this.sign = 'Sign in';
        }
        break;
      case 3:
        // Do something for "left arrow" key press.
        break;

    }

  }
  loginOg() {
    console.log(this.passC)
    if (this.email === '') {
      this.serveMe.showAlert('Kindly Input Email', 3);
    }
    if (!this.validateEmail(this.email)) {
      return ;
    }
    switch (this.logss1) {
      case 'login':
        if (this.pass === '') {
          return this.serveMe.showAlert('Kindly Input Your Password', 3);
        }
        this.serveMe.login(this.email, this.pass);
        break;
      case 'Create account':
        if (this.pass === '') {
          return this.serveMe.showAlert('Kindly Input Your Password', 3);
        }
        if (this.passC === '') {
          return this.serveMe.showAlert('Kindly Confirm Your Password', 3);
        }
        if (this.pass !== this.passC) {
          return this.serveMe.showAlert('password missmatch', 3);
        }
        this.serveMe.register(this.email, this.pass);
        break;
      case 'Resset Password':
        this.serveMe.sendPasswordResetEmail(this.email);
        this.login(2);
        break;

    }
  }
  closeIt(){
    const tobeclosed = document.getElementById('containerMain');
    tobeclosed.style.display = 'none';
  }
  google() {
    this.serveMe.loginWithGoogle();
  }
}
