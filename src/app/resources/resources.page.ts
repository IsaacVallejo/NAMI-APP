import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class ResourcesPage {

  cordovaReady = false;

  constructor() {
    document.addEventListener('deviceready', () => {
      this.cordovaReady = true;
    });
  }

  openResource(url: string) {
    const cordova = (window as any).cordova;

    if (this.cordovaReady && cordova?.InAppBrowser) {
      cordova.InAppBrowser.open(
        url,
        '_blank',
        'location=yes'
      );
    } else {
      window.open(url, '_blank');
    }
  }
}