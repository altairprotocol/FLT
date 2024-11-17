import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { UnverifiedComponent } from './unverified/unverified.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { VerifiedComponent } from './verified/verified.component';
import { FormsModule } from '@angular/forms';
import { KycStatusComponent } from './kyc-status/kyc-status.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ProfileComponent,
    SecurityComponent,
    UnverifiedComponent,
    PersonalDetailsComponent,
    DocumentUploadComponent,
    VerifiedComponent,
    KycStatusComponent
  ],
  imports: [CommonModule, FormsModule, AuthRoutingModule, IonicModule, NgOtpInputModule],
})
export class AuthModule { }
