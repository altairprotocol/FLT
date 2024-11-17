import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss'],
})
export class VerifiedComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
