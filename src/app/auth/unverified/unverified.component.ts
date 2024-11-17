import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss'],
})
export class UnverifiedComponent implements OnInit {

  constructor(public location: Location) { }

  back() {
    this.location.back();
  }

  ngOnInit() { }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
