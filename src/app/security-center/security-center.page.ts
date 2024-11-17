import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-security-center',
  templateUrl: './security-center.page.html',
  styleUrls: ['./security-center.page.scss'],
})
export class SecurityCenterPage implements OnInit {
  checkList:object;
  info:any;
  fundpass:any=false;
  antiphishing:any=false;
  kyc:any=false;
  google_2fa:any=false;
  score:number=0;
  total:number=6;
  last_time:number=0;
  score_text:any='Low';
  score_color:any='danger';
  greenWidth:any=0;
  redWidth:any=100;
  constructor(private location: Location,private loadingCtrl: LoadingController,private exchangeProvider: ExchangeProvider, private nav: NavController) { }

  ngOnInit() {
    this.getProfile();
  }

  back() {
    this.location.back()
  }
  
  async getProfile() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    this.exchangeProvider.securityCenter().subscribe(
      (data) => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        this.fundpass=this.info?.data?.fundpass;
        this.google_2fa=this.info?.data?.google_2fa;
        this.antiphishing=this.info?.data?.antiphishing;
        this.kyc=this.info?.data?.kyc;
        this.score=this.info?.data?.score;
        if(this.score<=2){
          this.score_text='Low';
          this.score_color='danger';
        }
        if(this.score>2 && this.score<=4 ){
          this.score_text='Medium';
          this.score_color='warning';
        }
        if(this.score>4 ){
          this.score_text='Safe';
          this.score_color='success';
        }
        this.greenWidth=(this.score / this.total) * 100;
        this.redWidth=100 - this.greenWidth;
        this.total=this.info?.data?.total;
        this.last_time=this.info.data.last_login;
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

}
