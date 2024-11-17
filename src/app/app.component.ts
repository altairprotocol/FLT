import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { ExchangeProvider } from './codono.service';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { register } from 'swiper/element/bundle';

register()

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  paletteToggle = false;
  darkMode: boolean = false;
  isAuthenticated: boolean = false;
  userEmail: any;
  hideKycBox: boolean = true;
  data: any;
  showMenu: boolean = false;
  fullName: any;
  userName: any;
  mainSearchBar: any;
  coins: any;
  isSearchActivated: boolean = false;
  reserve: any;
  constructor(private renderer: Renderer2, private el: ElementRef, private exchangeProvider: ExchangeProvider, private nav: NavController, private alertController: AlertController, private barcodeScanner: BarcodeScanner, private router: Router, private route: ActivatedRoute, private menu: MenuController, private cdr: ChangeDetectorRef, private location: Location) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.onRouteChange();
    });
  }

  onRouteChange() {
    this.ngOnInit()
  }

  checkRouteData(route: ActivatedRoute) {
    let child = route.firstChild;

    while (child) {
      if (child.snapshot.data && child.snapshot.data.showMenu !== undefined) {
        this.showMenu = child.snapshot.data.showMenu;
        this.menu.enable(this.showMenu);
        this.cdr.detectChanges();
        return;
      } else {
        this.showMenu = false;
      }
      child = child.firstChild;
    }
    this.showMenu = false;
    this.menu.enable(this.showMenu);
  }

  initializeDarkPalette(isDark) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleDarkPalette(shouldAdd) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  ngOnInit() {
    this.getTheme();
    this.marketData()
    if (this.isAuthenticated) {
      let userData = localStorage.getItem('userData')
    //  console.log(userData, 39);
      if (!userData) {
        location.reload()
      }
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.initializeDarkPalette(prefersDark.matches);

    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRouteData(this.route);
    });
    let userDataFromLocalStorage = localStorage.getItem('userData')
    if (userDataFromLocalStorage) {

      this.exchangeProvider.exchange_userinfo().subscribe((data: any) => {
        if (data?.status === 1) {
          this.isAuthenticated = true;
          this.userEmail = data?.data?.baseinfo?.email;
          this.hideKycBox = data?.data?.baseinfo?.kyc === "0" || data?.data?.baseinfo?.kyc === "3" ? false : true;
          this.fullName = data?.data?.baseinfo?.truename;
          this.userName = data?.data?.baseinfo?.username;
        }
      });
    } else {
      console.log("Line 34 was called");
    }
  }

  changeToDarkMode(darkMode: boolean) {
    if (darkMode === true) {
      document.body.id = 'dark';
      localStorage.setItem("darkMode", "true")
    } else {
      document.body.id = '';
      localStorage.setItem("darkMode", "false")
    }
    this.getTheme()
  }

  getTheme() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode && darkMode === 'true') {
      this.darkMode = true;
      document.body.id = 'dark';
    } else {
      this.darkMode = false;
      document.body.id = '';
    }
  }

  refer(path: string) {
    this.nav.navigateForward(path);
  }

  logout() {
    localStorage.clear();
    this.nav.navigateRoot('login2');
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(
      async (barcodeData) => {
        // Success! Barcode data is here
        let result: any = barcodeData.text;
        try {
          result = JSON.parse(barcodeData.text);
        } catch (error) {
          return false;
        }
        if (!result.desktop_ip && !result.qr_secure) {
          return false;
        }
        await this.presentAlert(result);
      },
      (err) => {
        // An error occurred
        console.log(JSON.stringify(err));
      }
    );
    // const qr_code='{"desktop_ip":"2401:4900:1c7a:5335:8580:9743:f984:3762","qr_secure":"15b0a28043ce4ec7840c57fdd90993e7"}';
    //this.presentAlert(JSON.parse(qr_code));
  }

  async presentAlert(result) {
    const alert = await this.alertController.create({
      header: `Are you sure? You want to login at ${result.desktop_ip}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.exchangeProvider.desktop_login(result.desktop_ip, result.qr_secure).subscribe((data) => {
              this.data = JSON.parse(JSON.stringify(data as any));
              if (this.data.status === 1) {
                this.exchangeProvider.presentToast(this.data.data);
              } else {
                this.exchangeProvider.presentToast(this.data.data);
              }

            },
              (error) => {
                this.exchangeProvider.presentToast('Error');
              });
          }
          ,
        }
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  // toggleMenu() {
  //   const menu = this.el.nativeElement.querySelector('ion-menu');
  //   if (menu && this.showMenu) {
  //     this.renderer.setStyle(menu, 'display', 'block');
  //     // this.renderer.addClass(menu, '.show-menu')
  //   }
  // }

  search(ev) {
    var val = ev.target.value;

    this.isSearchActivated = true;

    if (val === '') {
      this.isSearchActivated = false;
      return;
    }

    if (!val || val.trim() === '' || val === null) {
      this.isSearchActivated = false;
      return
    }
    if (val && val.trim() !== '') {
      this.coins = this.reserve.filter((item) => (item.ticker.toLowerCase().indexOf(val.toLowerCase()) > -1));
    }
  }

  marketData(baseName = 'usdt') {
    //filtermarket
    this.exchangeProvider
      .filtermarket('base', baseName.toLowerCase())
      .subscribe(
        (data) => {
          let info = JSON.parse(JSON.stringify(data as any));
          this.coins = info.data;
          this.reserve = info.data;
        },
        (error) => { }
      );
  }
  gotoToPage(page) {
    console.log(page);
    this.nav.navigateRoot(page);
  }
  referToMarketDetail(commonmarket: string) {
    this.isSearchActivated = false
    if (this.isAuthenticated) {
      this.nav.navigateRoot('pages/market-detail', {
        queryParams: { market: commonmarket },
      });
    } else {
      this.nav.navigateRoot('login2');
    }
  }

  referTo(path: string) {
    this.nav.navigateForward(path);
  }
}
