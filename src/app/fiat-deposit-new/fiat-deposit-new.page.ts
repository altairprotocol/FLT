import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiat-deposit-new',
  templateUrl: './fiat-deposit-new.page.html',
  styleUrls: ['./fiat-deposit-new.page.scss'],
})
export class FiatDepositNewPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

}
