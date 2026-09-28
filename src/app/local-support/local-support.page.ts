import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { TreatmentService } from '../services/treatment';

import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

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
  IonCardSubtitle,
  IonButton,
  AlertController
} from '@ionic/angular';


interface NearbyFacility {
  name: string;
  location: string;
  programs: string;
  insurance: string;
  phone: string;
  url: string;
}


@Component({
  selector: 'app-local-support',
  templateUrl: './local-support.page.html',
  styleUrls: ['./local-support.page.scss'],
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
    IonCardSubtitle,
    IonButton
  ]
})
export class LocalSupportPage {

  nearbyMessage = '';

  localSupport: any[] = [];

  nearbyFacilities: NearbyFacility[] = [];


  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertController: AlertController,
    private treatmentServices: TreatmentService
  ) {}


  testNearbyFacilities() {

    this.treatmentServices
      .searchNearbyFacilities(
        'Olympia',
        'Washington',
        10
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'GTH facility response: ' +
            JSON.stringify(response, null, 2)
          );
        },

        error: (error: any) => {

          console.error(
            'GTH API error:',
            error
          );
        }

      });
  }


  testAvailableTools() {

    this.treatmentServices
      .getAvailableTools()
      .subscribe({

        next: (response: any) => {

          const searchTool =
            response.result.tools[0];

          console.log(
            JSON.stringify(
              searchTool.inputSchema,
              null,
              2
            )
          );
        },

        error: (error: any) => {

          console.error(
            'GTH tools error:',
            error
          );
        }

      });
  }


  async showCrisisOptions() {

    const alert =
      await this.alertController.create({

        header: 'Crisis Support',

        message:
          'Would you like to call 988 for immediate crisis support?',

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Call 988',

            handler: () => {

              window.location.href =
                'tel:988';
            }
          }
        ]
      });

    await alert.present();
  }


  openWebsite(url: string) {

    console.log(
      'Opening URL: ' + url
    );

    if ((window as any).cordova) {

      (window as any).cordova.InAppBrowser.open(
        url,
        '_blank',
        'location=yes'
      );

    } else {

      window.open(
        url,
        '_blank'
      );
    }
  }


  findNearbyCare() {

    console.log(
      'Starting geolocation request'
    );

    this.nearbyMessage =
      'Getting your location...';

    this.nearbyFacilities = [];

    navigator.geolocation.getCurrentPosition(

      (position) => {

        console.log(
          'Location permission granted'
        );

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        console.log(
          'Latitude:',
          latitude
        );

        console.log(
          'Longitude:',
          longitude
        );

        this.nearbyMessage =
          'Location found. Determining your city...';

        this.changeDetector.detectChanges();


        this.treatmentServices
          .reverseGeocode(
            latitude,
            longitude
          )
          .subscribe({

            next: (location) => {

              const city =
                location.city ||
                location.locality ||
                '';

              const state =
                location.principalSubdivision ||
                '';

              console.log(
                'City:',
                city
              );

              console.log(
                'State:',
                state
              );


              if (!city || !state) {

                this.nearbyMessage =
                  'Your location was found, but we could not determine your city and state.';

                this.changeDetector.detectChanges();

                return;
              }


              this.nearbyMessage =
                `Location found: ${city}, ${state}. Searching for treatment services...`;

              this.changeDetector.detectChanges();


              this.treatmentServices
                .searchNearbyFacilities(
                  city,
                  state,
                  10
                )
                .subscribe({

                  next: (response: any) => {

                    console.log(
                      'GTH facility response: ' +
                      JSON.stringify(
                        response,
                        null,
                        2
                      )
                    );


                    const facilityText =
                      response?.result?.content?.[0]?.text || '';


                    this.nearbyFacilities =
                      this.parseFacilities(
                        facilityText
                      );


                    console.log(
                      'Parsed facilities: ' +
                      JSON.stringify(
                        this.nearbyFacilities,
                        null,
                        2
                      )
                    );


                    if (
                      this.nearbyFacilities.length > 0
                    ) {

                      this.nearbyMessage =
                        `Found ${this.nearbyFacilities.length} treatment services near ${city}, ${state}.`;

                    } else {

                      this.nearbyMessage =
                        `No treatment services were found near ${city}, ${state}.`;
                    }


                    this.changeDetector.detectChanges();
                  },


                  error: (error: any) => {

                    console.error(
                      'GTH search error:',
                      error
                    );

                    this.nearbyMessage =
                      'We found your location, but could not retrieve treatment services.';

                    this.changeDetector.detectChanges();
                  }

                });
            },


            error: (error) => {

              console.error(
                'Reverse geocoding error:',
                error
              );

              this.nearbyMessage =
                'Your coordinates were found, but we could not determine your city.';

              this.changeDetector.detectChanges();
            }

          });
      },


      (error) => {

        console.error(
          'Location error:',
          error
        );


        if (error.code === 1) {

          this.nearbyMessage =
            'Location permission was denied. Please allow location access to find services near you.';

        } else if (error.code === 2) {

          this.nearbyMessage =
            'Your location is currently unavailable. Please try again.';

        } else if (error.code === 3) {

          this.nearbyMessage =
            'Getting your location took too long. Please try again.';

        } else {

          this.nearbyMessage =
            'Unable to determine your location.';
        }


        this.changeDetector.detectChanges();
      },


      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }

    );
  }


  parseFacilities(
    text: string
  ): NearbyFacility[] {

    const facilities:
      NearbyFacility[] = [];


    const sections =
      text
        .split(/\*\*\d+\.\s+/)
        .slice(1);


    for (const section of sections) {

      const lines =
        section
          .split('\n')
          .map(
            line =>
              line.trim()
          )
          .filter(
            line =>
              line !== ''
          );


      if (lines.length === 0) {

        continue;
      }


      const name =
        lines[0]
          .replace(/\*\*/g, '')
          .trim();


      const locationLine =
        lines.find(
          line =>
            line.startsWith(
              'Location:'
            )
        ) || '';


      const programsLine =
        lines.find(
          line =>
            line.startsWith(
              'Programs:'
            )
        ) || '';


      const insuranceLine =
        lines.find(
          line =>
            line.startsWith(
              'Insurance:'
            )
        ) || '';


      const phoneLine =
        lines.find(
          line =>
            line.startsWith(
              'Phone:'
            )
        ) || '';


      const url =
        `https://gettreatmenthelp.com/browse?name=${encodeURIComponent(name)}`;


      facilities.push({

        name: name,

        location:
          locationLine
            .replace(
              'Location:',
              ''
            )
            .trim(),

        programs:
          programsLine
            .replace(
              'Programs:',
              ''
            )
            .trim(),

        insurance:
          insuranceLine
            .replace(
              'Insurance:',
              ''
            )
            .trim(),

        phone:
          phoneLine
            .replace(
              'Phone:',
              ''
            )
            .trim(),

        url: url
      });
    }


    return facilities;
  }


  async loadLocalSupport() {

    try {

      this.localSupport = [];


      const querySnapshot =
        await getDocs(
          collection(
            db,
            'localSupport'
          )
        );


      querySnapshot.forEach(
        (doc) => {

          this.localSupport.push(
            doc.data()
          );
        }
      );


      this.changeDetector.detectChanges();

    } catch (error) {

      console.error(
        'Firestore error:',
        error
      );
    }
  }


  ionViewWillEnter() {

    this.loadLocalSupport();
  }

}