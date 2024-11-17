import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-kyc-status',
  templateUrl: './kyc-status.component.html',
  styleUrls: ['./kyc-status.component.scss'],
})
export class KycStatusComponent implements OnInit {

  constructor(public location: Location, private exchangeProvider: ExchangeProvider) { }

  kycComment: string = null;
  kycStatus: number = null;

  back() {
    this.location.back();
  }

  getKycStatus() {
    this.exchangeProvider.kycStatus().subscribe((res: any) => {
      console.log(res?.data.kyc_status)
      if (res?.status === 1 && res?.data.kyc_status) {
        this.kycStatus = Number(res?.data.kyc_status);
        this.kycComment = res?.data.kyc_comment;
      }
    })
  }

  ngOnInit() {
    this.getKycStatus()
  }

  doRefresh(event) {
    this.getKycStatus()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
