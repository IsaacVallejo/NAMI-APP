import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { TreatmentService } from '../services/treatment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButtons, IonMenuButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton, AlertController
} from '@ionic/angular';

@Component({
  selector: 'app-local-support',
  templateUrl: './local-support.page.html',
  styleUrls: ['./local-support.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
    IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonCardSubtitle, IonButton, 
  ]
})
export class LocalSupportPage {

  nearbyMessage = '';
  localSupport: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef, 
    private alertController: AlertController,
    private treatmentServices: TreatmentService) {}

  
  
  testNearbyFacilities(){
    this.treatmentServices.searchNearbyFacilities('98503', 10)
    .subscribe({
      next: (response: any) => {
        console.log('GTH facility text:',
        response.result.content[0].text);
      },
        error: (error: any) => {
        console.log('GTH API error:',error);
      }
    });
  }


  testAvailableTools() {

    this.treatmentServices
      .getAvailableTools()
      .subscribe({

        next: (response: any) => {
          const searchTool = response.result.tools[0];

          console.log(
            JSON.stringify(
              searchTool.inputSchema,
              null,
              2
            )
          );
        },

        error: (error: any) => {
          console.error('GTH tools error:', error);
        }

      });
  }
  async showCrisisOptions(){
    const alert = await this.alertController.create({
      header: 'Crisis Support',
      message: 'Would you like to call 988 for immediate crisis support?',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Call 988',
          handler: () => {
            window.location.href = 'tel:988';
          }
        }
      ]
    });
    await alert.present();
  }

  openWebsite(url: string){
    if((window as any).cordova){
      (window as any).cordova.InAppBrowser.open(
        url,
        '_blank',
        'location=yes'
      );
    }
    else{
      window.open(url,'_blank');
    }
  }


  findNearbyCare() {

  this.nearbyMessage = 'Getting your location...';

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);

      this.nearbyMessage =
        'Location found. Searching for nearby care...';

      this.changeDetector.detectChanges();

      // Later:
      // call the GTH API here

    },

    (error) => {

      console.error('Location error:', error);

      this.nearbyMessage =
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