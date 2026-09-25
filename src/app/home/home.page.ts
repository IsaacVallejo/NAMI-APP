import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonList, IonListHeader, IonLabel, IonItem
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    RouterLink, IonList, IonListHeader, IonLabel, IonItem]
})
export class HomePage {

  events: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadEvents();
  }

  async loadEvents() {
    const querySnapshot = await getDocs(collection(db, 'events'));

    querySnapshot.forEach((doc) => {
      this.events.push(doc.data());
    });
  }

}
