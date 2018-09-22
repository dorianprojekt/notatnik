import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { DatabaseService } from './database.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    private bState: BehaviorSubject<LoginState>;

    constructor(private fire: FirebaseService, private db: DatabaseService) {
        fire.auth().languageCode = 'pl';

        this.bState = new BehaviorSubject<LoginState>(new LoginState(AUTH_NOT_LOGGED, null));//wartosc startowa - niezalogowany

        this.fire.auth().onAuthStateChanged((user) => {
            if(user){
                this.bState.next(new LoginState(AUTH_LOGIN_OK, user));
            } else {
                this.bState.next(new LoginState(AUTH_NOT_LOGGED, null));  //user null oznacza niezalogowany       
            }
        });
    }

    public login(email: string, haslo: string):void{
        this.fire.auth().signInWithEmailAndPassword(email, haslo).catch((error)=>{ 
            this.bState.next(new LoginState(AUTH_INVALID, null));
            console.log(error); 
        });
    }

    public createUser(email: string, haslo: string):void{
        this.fire.auth().createUserWithEmailAndPassword(email, haslo).catch((error)=>{ 
            this.bState.next(new LoginState(AUTH_INVALID, null));
            console.log(error); 
        });
    }

    public loginWithGoogle():void{
        let provider = this.fire.getGoogleAuthProvider();
        this.fire.auth().signInWithPopup(provider).then((result) => {
            let token = result.credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
            let user = result.user; // The signed-in user info.
            
        }).catch((error)=>{ 
            this.bState.next(new LoginState(AUTH_INVALID, null));
            console.log(error); 
        });
    }

    public logout(): void{
        this.bState.next(new LoginState(AUTH_WAITING, null));
        this.fire.auth().signOut().then(() => {
            this.bState.next(new LoginState(AUTH_NOT_LOGGED, null));
        }).catch((error)=>{ console.log(error); });
    }

    public getLoginState(): BehaviorSubject<LoginState>{
        return this.bState;
    }

    public getLastLoginState(): LoginState{
        return this.bState.getValue();
    }

}

export class LoginState{
    public state: number; //to co na dole, te wartosci const
    public firebaseUser; //jakbysmy potrzebowali - obiekt firebase

    constructor(state: number, firebaseUser){
        this.state = state;
        this.firebaseUser = firebaseUser;
    }
}

export const AUTH_NOT_LOGGED: number = 0; //niezalogowano
export const AUTH_INVALID: number = 1; //blad logowania
export const AUTH_LOGIN_OK: number = 2;//zalogowano poprawnie
export const AUTH_WAITING: number = 3; // czekamy na odpowiedz
