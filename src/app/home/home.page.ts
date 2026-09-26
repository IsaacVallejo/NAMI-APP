import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import { Component, ChangeDetectorRef } from '@angular/core';

import {IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButtons,
  IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButtons,
    IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ]
})
export class HomePage {

  events: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadEvents();
  }

  async loadEvents() {
    try {
      this.events = [];

      const querySnapshot = await getDocs(
        collection(db, 'events')
      );

      console.log('events found:', querySnapshot.size);

      querySnapshot.forEach((doc) => {
        console.log('event:', doc.data());

        this.events.push(doc.data());
      });

      console.log('events array:', this.events);

      this.changeDetector.detectChanges();

    } catch (error) {
      console.error('Firestore events error:', error);
    }
  }
}