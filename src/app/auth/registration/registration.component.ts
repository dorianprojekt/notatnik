import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, AUTH_LOGIN_OK, AUTH_INVALID } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    private observer;

     formLogin: string = '';
     formPass: string = '';

    constructor(private auth: AuthService, private router: Router) {

    }

    ngOnInit() {
        this.auth.logout(); //wyloguj, przy wlaczeniu strony rejestracji

        this.observer = this.auth.getLoginState().subscribe(v => {
            console.log(v);
            if (v.state === AUTH_LOGIN_OK) {
                this.router.navigate(['/home']);
            } else if (v.state === AUTH_INVALID){
                alert ('Błąd rejestracji. Spróbuj ponownie.');
            }
        });
    }

    ngOnDestroy(){
        if(this.observer) this.observer.unsubscribe();
    }

     zarejestruj(){
        this.auth.createUser(this.formLogin, this.formPass);
    }

}
