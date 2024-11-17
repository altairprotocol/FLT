import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { strongPasswordRegex } from 'src/utils/regex';
import { countries as AllCountries } from '../auth/personal-details/countries';

@Component({
  selector: 'app-store-edit-address',
  templateUrl: './store-edit-address.page.html',
  styleUrls: ['./store-edit-address.page.scss'],
})
export class StoreEditAddressPage implements OnInit {

  addressTitle: string;
  contactName: string;
  contactNumber: string;
  region: string = 'af';
  city: string;
  shippingAddress: string;
  fundPassword: string;
  fundPasswordValid: boolean;
  countries = AllCountries;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  onPassword() {
    const result = this.fundPassword.match(strongPasswordRegex)
    if (result) {
      this.fundPasswordValid = true
      return
    }
    this.fundPasswordValid = false
  }

}
