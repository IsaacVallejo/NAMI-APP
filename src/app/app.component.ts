import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel, IonButtons, IonButton} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterLink, IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel, IonButtons, IonButton],
})
export class AppComponent {
  constructor() {}
}
