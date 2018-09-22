import { Component, OnInit } from '@angular/core';
import { NotatkiService } from '../services/notatki.service';
import { AuthService } from '../services/auth.service';
import { Notatka } from '../model/notatka';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    notatki: Notatka[] = [];

    constructor(private not: NotatkiService, private auth: AuthService) {

    }

    ngOnInit() {
        let uid = this.auth.getLastLoginState().firebaseUser.uid;
        console.log(uid);
        //wczytaj liste notatek
        this.not.getList(uid).then(val => {
            this.notatki = val;
        });
    }

    usun(id) {
        if(confirm("Czy napewno usunąć?")){
            this.not.deleteById(id);
            this.notatki.splice(this.findIndexById(id), 1);
        }
    }

    findIndexById(id) {
        for (let i = 0; i < this.notatki.length; i++) {
            if (this.notatki[i].id === id) { return i; }
        }
        return -1;
    }

}
