import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {
  info: any;
  profiles: any;
  profileData: any = { fiats: null, fullname: null, username: null, email: null, mobile: null, userfiat: null };
  hideKycBox: boolean = true;
  constructor(private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private location: Location) { }

  ngOnInit() {
    this.getProfile()
  }

  referTo(url: string) {
    this.nav.navigateRoot(url)
  }

  async getProfile() {
    const alert = await this.loadingCtrl.create({
      message: 'Checking Security...',
    });
    alert.present();
    this.exchangeProvider.exchange_profile().subscribe(
      (data) => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        const kycStatus = this.info?.data ? this.info?.data[0].kyc : null;
        this.hideKycBox = kycStatus === "0" || kycStatus === "3" ? false : true;
        this.profiles = this.info?.data[0];
        this.profileData.fiats = this.profiles?.fiats;
        this.profileData.userfiat = this.profiles?.userfiat;
        this.profileData.fullname = this.profiles?.truename;
        this.profileData.username = this.profiles?.username;
        this.profileData.email = this.profiles?.email;
        this.profileData.mobile = this.profiles?.mobile;
        alert.dismiss();
      },
      (error) => {
        alert
          .dismiss()
          .then()
          .catch((error) => { });
      }
    );
  }

  refer(path: string) {
    this.nav.navigateForward(path);
  }

  maskEmail(email: string): string {
    if (!email) return "***"
    const [localPart, domainPart] = email.split('@');

    if (!localPart || !domainPart) {
      console.log("Invalid email");
      return "***"

    }

    const maskedLocalPart = localPart.length > 2
      ? localPart.substring(0, 2) + '*'.repeat(localPart.length - 2)
      : localPart + '*'.repeat(2 - localPart.length);

    const domainParts = domainPart.split('.');
    const domainName = domainParts[0];
    const tld = domainParts.slice(1).join('.');

    const maskedDomainName = domainName.length > 1
      ? domainName.substring(0, 1) + '*'.repeat(domainName.length - 1)
      : '*';

    const maskedEmail = `${maskedLocalPart}@${maskedDomainName}.${tld}`;

    return maskedEmail;
  }

  back() {
    this.location.back()
  }

}
