import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-community',
  templateUrl: './profile-community.page.html',
  styleUrls: ['./profile-community.page.scss'],
})
export class ProfileCommunityPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}
