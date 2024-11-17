import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { UnverifiedComponent } from './unverified/unverified.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { VerifiedComponent } from './verified/verified.component';
import { KycStatusComponent } from './kyc-status/kyc-status.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotpasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'unverified', component: UnverifiedComponent },
  { path: 'personal-details', component: PersonalDetailsComponent },
  { path: 'document-upload', component: DocumentUploadComponent },
  { path: 'verified', component: VerifiedComponent },
  { path: 'kyc-status', component: KycStatusComponent },
  {
    path: 'profile2',
    loadChildren: () => import('./profile2/profile2.module').then( m => m.Profile2PageModule)
  },
  {
    path: 'profile-about',
    loadChildren: () => import('./profile-about/profile-about.module').then( m => m.ProfileAboutPageModule)
  },
  {
    path: 'profile-community',
    loadChildren: () => import('./profile-community/profile-community.module').then( m => m.ProfileCommunityPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
