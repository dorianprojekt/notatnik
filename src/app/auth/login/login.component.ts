import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, AUTH_LOGIN_OK, AUTH_INVALID } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    private observer;

    formLogin: string = '';
    formPass: string = '';

    constructor(private auth: AuthService, private router: Router) {

    }

    ngOnInit() {
        this.auth.logout(); //wyloguj, przy wlaczeniu strony logowania

        this.observer = this.auth.getLoginState().subscribe(v => {
            console.log(v);
            if (v.state === AUTH_LOGIN_OK) {
                this.router.navigate(['/home']);
            } else if (v.state === AUTH_INVALID){
                alert ('Zły login lub hasło. Spróbuj ponownie.');
            }
        });
    }

    ngOnDestroy(){
        if(this.observer) this.observer.unsubscribe();
    }

     zaloguj(): void{
        this.auth.login(this.formLogin, this.formPass);
    }

     loginGoogle():void{
        this.auth.loginWithGoogle();
    }

}

