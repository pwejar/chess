import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServemeService {
  loadingIt: any;
  photo: any;
  constructor(
    public angularFireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private navMe: NavController,
    private loadingController: LoadingController
  ) { 
    this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
        this.photo = this.isUserLoggedIn().photoURL;
        console.log(this.isUserLoggedIn().photoURL)
      } else {
        localStorage.setItem('user', null);
        const thiss = document.getElementById('containerMain');
        thiss.style.display = 'grid';
      }
    });
  }
  async login(email: string, password: string) {
    this.loading();
    return await this.angularFireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.loadingIt.dismiss();
      const dree = document.getElementById('containerMain');
      dree.style.display = 'none';
    }).catch(err => {
      this.loadingIt.dismiss();
      this.showAlert(err.message, 3);
    });
  }

  async register(email: string, password: string) {
    this.loading();
    return await this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.loadingIt.dismiss();
      const dree = document.getElementById('containerMain');
      dree.style.display = 'none';
    }).catch(err => {
      this.loadingIt.dismiss();
      this.showAlert(err.message, 3);
    });
  }

  async sendEmailVerification() {
    return await (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    this.loading();
    return await this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      this.loadingIt.dismiss();
      this.showAlert('Kindly Check Your Email', 3);
    }).catch(err => {
      this.loadingIt.dismiss();
      this.showAlert(err.message, 3);
    });
  }

  async logout() {
    return await this.angularFireAuth.signOut();
  }
  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
  async  loginWithGoogle() {
    return await this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      const dree = document.getElementById('containerMain');
      dree.style.display = 'none';
    }).catch(err => {
      this.showAlert(err.message, 3);
    });
  }
  async showAlert(ujumbe: string, sec: number) {
    const alert = await this.alertCtrl.create({
      message: ujumbe
    });
    alert.present();
    setTimeout(() => alert.dismiss(), 1000 * sec);

  }
  async loading() {
    this.loadingIt = await this.loadingController.create({
      message: 'Please wait...',
      duration: 8000
    });

    await this.loadingIt.present();
  }
}
