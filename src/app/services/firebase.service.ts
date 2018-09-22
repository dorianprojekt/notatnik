import { Injectable } from '@angular/core';
import * as firebase from "firebase";


@Injectable()
export class FirebaseService {

    constructor() {

        let config = {
            apiKey: "AIzaSyA_--uMvawPubAEvPvB2PuHQ6TuXMMvg60",
            authDomain: "dorianprojekt-3f366.firebaseapp.com",
            databaseURL: "https://dorianprojekt-3f366.firebaseio.com",
            projectId: "dorianprojekt-3f366",
            storageBucket: "dorianprojekt-3f366.appspot.com",
            messagingSenderId: "532141041715"
        };
        firebase.initializeApp(config);
        
    }

    public auth(){
        return firebase.auth();
    }

    public db(){
        return firebase.database();
    }

    public getGoogleAuthProvider(){
        return new firebase.auth.GoogleAuthProvider();
    }


}
