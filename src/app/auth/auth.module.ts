import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { AngularMaterialModule } from '../angular-material.module';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports:[
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthRoutingModule
    ]
})

export class AuthModule { }