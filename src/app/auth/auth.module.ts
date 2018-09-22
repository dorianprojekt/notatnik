import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  exports: [
    RegistrationComponent,
    LoginComponent
  ]

})
export class AuthModule { }
