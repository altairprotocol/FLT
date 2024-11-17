import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {

  constructor(public location: Location, public exchangeProvider: ExchangeProvider) { }

  response: string = null;
  oldPassword: string = null;
  newPassword: string = null;
  confirmNewPassword: string = null;

  back() {
    this.location.back();
  }

  ngOnInit() { }

  updatePassword() {
    console.log(this.oldPassword, this.newPassword, this.confirmNewPassword);

    if (this.oldPassword && this.newPassword && this.confirmNewPassword) {
      if (this.newPassword === this.confirmNewPassword) {
        this.exchangeProvider.uppassword(this.oldPassword, this.newPassword).subscribe((response: any) => {
          if (response?.status === 1) {
            this.response = response?.data
          } else {
            this.response = response?.data
          }
        })
      } else {
        this.response = "New passwords doesn't match."
      }
    } else {
      this.response = "Please fill out all the fields."
    }
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
