import { AuthGuard } from './auth/guard.auth';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NotatkaComponent } from './notatka/notatka.component';

const appRoutes: Routes = [
    {
        path: '', component: HomePageComponent, canActivate: [AuthGuard]
    },
    {
        path: 'home', component: HomePageComponent, canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    {
        path: 'notatka/:id', component: NotatkaComponent, canActivate: [AuthGuard]
    },

    // otherwise redirect to HomePageComponent
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

