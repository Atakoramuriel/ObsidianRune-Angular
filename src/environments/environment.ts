// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: true,
  firebase: {
  apiKey: "AIzaSyBT9KgVgHpDyJt_-11MNEKo_2wJb8jnqfg",
  authDomain: "obsidianrune-vuejs.firebaseapp.com",
  databaseURL: "https://obsidianrune-vuejs.firebaseio.com",
  projectId: "obsidianrune-vuejs",
  storageBucket: "obsidianrune-vuejs.appspot.com",
  messagingSenderId: "588393651282",
  appId: "1:588393651282:web:5dfed223f6c837356f538b",
  measurementId: "G-KBHTCX97NR"
  }
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   firebase: {
//     apiKey: "AIzaSyBT9KgVgHpDyJt_-11MNEKo_2wJb8jnqfg",
//     authDomain: "obsidianrune-vuejs.firebaseapp.com",
//     databaseURL: "https://obsidianrune-vuejs.firebaseio.com",
//     projectId: "obsidianrune-vuejs",
//     storageBucket: "obsidianrune-vuejs.appspot.com",
//     messagingSenderId: "588393651282",
//     appId: "1:588393651282:web:84be2d26360266176f538b"
//   }
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
