import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  fileSelected: boolean = false;
  fileName: string = '';
  info: any;
  profiles: any;
  profileData: any = { fiats: null, fullname: null, username: null, email: null, mobile: null, userfiat: null };


  constructor(public location: Location, public loadingCtrl: LoadingController, public exchangeProvider: ExchangeProvider) { }

  back() {
    this.location.back();
  }

  async getProfile() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    this.exchangeProvider.exchange_profile().subscribe(
      (data) => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        console.log(this.info);
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

  ngOnInit() {
    this.getProfile()
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileSelected = true;
      this.fileName = input.files[0].name;
    } else {
      this.fileSelected = false;
      this.fileName = '';
    }
  }

  doRefresh(event) {
    this.getProfile()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
