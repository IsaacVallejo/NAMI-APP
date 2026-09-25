import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButtons, IonBackButton, IonButton
} from '@ionic/angular';

@Component({
  selector: 'app-local-support',
  templateUrl: './local-support.page.html',
  styleUrls: ['./local-support.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonBackButton, IonButton]
})
export class LocalSupportPage implements OnInit {

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  supportMessage = '';
  findNearestSupport() {

    this.supportMessage = "Searching for nearby NAMI support...";

    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);

      this.supportMessage = '';
      this.changeDetector.detectChanges();
    },
      (error) => {
        console.log('Location error:', error.message);

        this.supportMessage = 'Unable to access your location. Please check your permissions.';

        this.changeDetector.detectChanges();
      }
    );
  }

  localSupport: any[] = [];



  async loadLocalSupport() {
    try {
      this.localSupport = [];

      const querySnapshot = await getDocs(
        collection(db, 'localSupport')
      );

      console.log('docs found:', querySnapshot.size);

      querySnapshot.forEach((doc) => {
        this.localSupport.push(doc.data());
      });

      console.log('final array:', this.localSupport);
      this.changeDetector.detectChanges();


    } catch (error) {
      console.error('Firestore error:', error);
    }
  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadLocalSupport();
  }

}
