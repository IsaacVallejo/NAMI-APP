import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/angular';

@Component({
  selector: 'app-local-support',
  templateUrl: './local-support.page.html',
  styleUrls: ['./local-support.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class LocalSupportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
