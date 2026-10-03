# NAMI Thurston-Mason Hybrid Mobile Application

## Project Overview

This project is a hybrid mobile application developed for CS430 Mobile Applications Development.

The purpose of the application is to make local mental health information easier to access from a mobile device. The app focuses on NAMI Thurston-Mason resources, crisis support, upcoming events, trusted mental health information, and nearby treatment options.

The application was built with Ionic and Angular and uses Apache Cordova for native mobile functionality.

## Final Application

The final application contains three main pages:

- Home
- Local Support
- Resources

The app also uses a shared side menu for navigation between these pages.

## Main Features

- Firebase Firestore integration
- Four upcoming event records loaded from Firestore
- One local NAMI Thurston-Mason support record loaded from Firestore
- 988 crisis support
- Device geolocation
- BigDataCloud reverse geocoding
- Nearby treatment searching through Get Treatment Help
- Facility result cards
- Direct call actions
- External resource links
- Cordova InAppBrowser
- Android testing
- iOS testing

## Technologies Used

- Ionic
- Angular
- TypeScript
- HTML
- SCSS
- Apache Cordova
- Firebase Firestore
- BigDataCloud
- Get Treatment Help
- Android Studio
- Xcode
- Git
- GitHub

## Cordova Plugins

- `cordova-plugin-geolocation`
- `cordova-plugin-inappbrowser`
- `cordova-plugin-statusbar`
- `cordova-plugin-device`
- `cordova-plugin-splashscreen`
- `cordova-plugin-ionic-webview`
- `cordova-plugin-ionic-keyboard`

## Firebase

Firebase Firestore is used to provide dynamic application content.

The application reads data from:

- `events`
- `localSupport`

The final version retrieves at least five Firestore records.

## Testing

The application was tested in:

- Browser development with `ionic serve`
- Android Studio using an Android emulator
- Xcode using an iOS simulator

Testing included Firebase data loading, navigation, geolocation, reverse geocoding, treatment searches, external links, and crisis-support functionality.

## Project Status

The final version of the application is complete for the Week 8 course submission and has been tested in both Android and iOS environments.

## Author

Isaac Vallejo

## Course

CS430 Mobile Applications Development  
Week 8 Final Project
