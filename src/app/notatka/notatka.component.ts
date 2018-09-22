import { Component, OnInit } from '@angular/core';
import { NotatkiService } from '../services/notatki.service';
import { AuthService } from '../services/auth.service';
import { Notatka } from '../model/notatka';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notatka',
  templateUrl: './notatka.component.html',
  styleUrls: ['./notatka.component.css']
})
export class NotatkaComponent implements OnInit {

    notatka: Notatka;

    isEdit = false;
    idNotatka: number; // jeśli -1 to nowy, inny edytuj podany

    notatkaAddForm: FormGroup;

    constructor(private fbp: FormBuilder, private not: NotatkiService,  private auth: AuthService, private route: ActivatedRoute, private location: Location) {

    }

    ngOnInit() {
        this.notatkaAddForm = this.fbp.group({
            'nazwa': '',
            'tresc': ''
        });

        this.idNotatka = +this.route.snapshot.paramMap.get('id');
        this.notatka = new Notatka();

        if (this.idNotatka === -1) {
            this.isEdit = false;
        } else {
            this.isEdit = true;

            this.not.getById(this.idNotatka).then(v => {
                this.notatka = v;
                console.log(v);
                this.notatkaAddForm.get("nazwa").setValue(v.nazwa);
                this.notatkaAddForm.get("tresc").setValue(v.tresc);
            });
        }
    }

    onSubmitAdd(v): void {
        const p = this.notatka;

        p.nazwa = v.nazwa;
        p.tresc = v.tresc;

        if (!this.isEdit) {
            p.setCurrentDate();//ustaw date
            p.userId = this.auth.getLastLoginState().firebaseUser.uid;
            this.not.add(p);
            this.location.back();
        } else {
            this.not.update(p);
            this.location.back();
        }
    }

    anuluj() {
        this.location.back();
    }

}
