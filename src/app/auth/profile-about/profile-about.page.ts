import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.page.html',
  styleUrls: ['./profile-about.page.scss'],
})
export class ProfileAboutPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}
