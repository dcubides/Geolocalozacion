import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Session } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Nuevo parque',
      url: '/newpark',
      icon: 'add'
    },
    {
      title: 'Informe de parques',
      url: '/list',
      icon: 'list'
    } 
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.auth.Session.subscribe(session => {
      if(session){
        console.log('log ON');
      } else{
        console.log('log OFF');
      }
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logOut(){
    this.auth.logout();
  }
}
