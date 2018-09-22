import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    constructor(private auth: AuthService) { }

    ngOnInit() {

    }
}
