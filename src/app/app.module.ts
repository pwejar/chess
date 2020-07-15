import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

const config = {
  apiKey: 'AIzaSyAviluGqISsGnZ4SUzgodvGr7dq7TGF6bk',
    authDomain: 'kilifichess.firebaseapp.com',
    databaseURL: 'https://kilifichess.firebaseio.com',
    projectId: 'kilifichess',
    storageBucket: 'kilifichess.appspot.com',
    messagingSenderId: '343212887936',
    appId: '1:343212887936:web:3a603bc4f96c7b9cf87b65',
    measurementId: 'G-D0GBETHYGV'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
