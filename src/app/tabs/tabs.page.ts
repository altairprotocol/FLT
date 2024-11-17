import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeProvider } from '../codono.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router, private exchangeProvider: ExchangeProvider, private nav: NavController) { }

  isActive(tab: string): boolean {
    return this.router.url.includes(tab);
  }

  comingSoon() {
    this.exchangeProvider.presentToast("Coming soon.")
  }

  referTo(url: string) {
    this.nav.navigateForward(url);
  }

}
