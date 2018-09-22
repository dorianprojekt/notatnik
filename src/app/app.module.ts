import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './auth/guard.auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//components:
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotatkaComponent } from './notatka/notatka.component';
import { MenuComponent } from './menu/menu.component';

//services:
import { AuthService } from './services/auth.service';
import { NotatkiService } from './services/notatki.service';
import { DatabaseService } from './services/database.service';
import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotatkaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [AuthGuard, AuthService, NotatkiService, DatabaseService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

