// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBogVtFMYnBFcbRVdWKM-x4WKUfosRU2Sg",
    authDomain: "file-image-modlue5.firebaseapp.com",
    projectId: "file-image-modlue5",
    storageBucket: "file-image-modlue5.appspot.com",
    messagingSenderId: "105263337903",
    appId: "1:105263337903:web:7a6d89d4d8b421f1075f5a",
    measurementId: "G-C1E3VDH1HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export class storage {
}