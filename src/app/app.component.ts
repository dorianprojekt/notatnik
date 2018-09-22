import { Component } from '@angular/core';
import { AuthService, AUTH_LOGIN_OK } from './services/auth.service';
import { Routes, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    canShowMenu: boolean = false;

    constructor(private auth: AuthService) {
        this.canShowMenu = false;
        this.auth.getLoginState().subscribe(data => {
            if (data.state === AUTH_LOGIN_OK) {
                this.canShowMenu = true;
            } else {
                this.canShowMenu = false;
            }
        });
    }
}

