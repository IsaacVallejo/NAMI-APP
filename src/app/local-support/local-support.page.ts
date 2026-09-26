import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButtons, IonMenuButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton
} from '@ionic/angular';

@Component({
  selector: 'app-local-support',
  templateUrl: './local-support.page.html',
  styleUrls: ['./local-support.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
    IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonCardSubtitle, IonButton
  ]
})
export class LocalSupportPage {

  supportMessage = '';
  localSupport: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  findNearestSupport() {
    this.supportMessage = 'Searching for nearby NAMI support...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);

        this.supportMessage = '';
        this.changeDetector.detectChanges();
      },

      (error) => {
        console.log('Location error:', error.message);

        this.supportMessage =
          'Unable to access your location. Please check your permissions.';

        this.changeDetector.detectChanges();
      }
    );
  }

  async loadLocalSupport() {
    try {
      this.localSupport = [];

      const querySnapshot = await getDocs(
        collection(db, 'localSupport')
      );

      querySnapshot.forEach((doc) => {
        this.localSupport.push(doc.data());
      });

      this.changeDetector.detectChanges();

    } catch (error) {
      console.error('Firestore error:', error);
    }
  }
  
  ionViewWillEnter() {
    this.loadLocalSupport();
  }
}