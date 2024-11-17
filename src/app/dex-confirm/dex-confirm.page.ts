import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dex-confirm',
  templateUrl: './dex-confirm.page.html',
  styleUrls: ['./dex-confirm.page.scss'],
})
export class DexConfirmPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

}
