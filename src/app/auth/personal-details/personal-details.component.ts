import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';
import { countries as AllCountries } from './countries';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  firstName: string = null;
  lastName: string = null;
  dob: string = null;
  gender: string = null;
  country: string = 'af';
  city: string = null;
  state: string = null;
  zipCode: any = null;
  address: string = null;
  errorMessage: string = null;
  countries = AllCountries


  constructor(private exchangeProvider: ExchangeProvider, private nav: NavController, private location: Location) { }

  back() {
    this.location.back();
  }

  ngOnInit() {
    this.getKYCProfileData()
  }

  getKYCProfileData() {
    this.exchangeProvider.kyc_profile().subscribe((res: any) => {
      if (res?.status === 1) {
        if (res?.data?.data?.firstname) {
          this.firstName = res?.data.data.firstname
        }
        if (res?.data?.data?.lastname) {
          this.lastName = res?.data.data.lastname
        }
        if (res?.data?.data?.city) {
          this.city = res?.data.data.city
        }
        if (res?.data?.data?.gender) {
          this.gender = res?.data.data.gender
        }
        if (res?.data?.data?.address) {
          this.address = res?.data.data.address
        }
        if (res?.data?.data?.country) {
          this.country = res?.data.data.country
        }
        if (res?.data?.data?.state) {
          this.state = res?.data.data.state
        }
        if (res?.data?.data?.zip) {
          this.zipCode = res?.data.data.zip
        }

      }
    })
  }

  convertDateFormat(dateString) {
    const dateParts = dateString.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return formattedDate;
  }

  handleNext() {
    // href="auth/document-upload"
    console.log(this.firstName, this.lastName, this.dob, this.gender, this.country, this.city, this.state, this.zipCode, this.address);

    let missingFields: string[] = [];

    if (!this.firstName) {
      missingFields.push('First Name');
    }
    if (!this.lastName) {
      missingFields.push('Last Name');
    }
    if (!this.country) {
      missingFields.push('Country');
    }
    if (!this.state) {
      missingFields.push('State');
    }
    if (!this.city) {
      missingFields.push('City');
    }
    if (!this.zipCode) {
      missingFields.push('Zip Code');
    }
    if (!this.gender) {
      missingFields.push('Gender');
    }
    if (!this.dob) {
      missingFields.push('Date of Birth');
    }


    if (missingFields.length === 0) {
      this.exchangeProvider.uploadProfileData(this.firstName, this.lastName, this.country, this.state, this.city, this.zipCode, this.gender, this.address, this.convertDateFormat(this.dob)).subscribe((res: any) => {
        if (res.status === 1 && res.data.status === 1) {
          this.nav.navigateForward('auth/document-upload');
        } else {
          this.errorMessage = "Something went wrong."
        }
      })
    } else {
      this.errorMessage = `Please fill out the following fields: ${missingFields.join(', ')}`;
    }


  }

  doRefresh(event) {
    this.getKYCProfileData()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
