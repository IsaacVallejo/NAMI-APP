import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonButtons, IonBackButton
} from '@ionic/angular';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonButtons, IonBackButton]
})
export class ResourcesPage implements OnInit {

  constructor() { }

  openResource(url: string) {

    if ((window as any).cordova) {
      (window as any).cordova.InAppBrowser.open(
        url, '_blank', 'location=yes'
      );
    } else {
      window.open(url, '_blank');
    }
  }
  ngOnInit() {
  }

}
