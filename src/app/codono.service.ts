/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';
// import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ExchangeProvider {
  // local use
  sendcoins: any;
  xdata: any;
  exchangeUrl = environment.exchangeUrl + '/';
  exchangeApiUrl: string = this.exchangeUrl + environment.apiFolder;
  public defaultHeaders = new HttpHeaders();
  // my server
  constructor(
    public http: HttpClient,
    // public storage: Storage,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    // private translateService: TranslateService
  ) {
    console.log('Exchange Integrator Provider');
  }

  // transme(input: string) {
  //   return this.translateService.instant(input);
  // }
  exchangeConnect() {
    const xdata = JSON.parse(localStorage.getItem('userData'));
    return xdata;
  }
  articleList() {
    return this.http.post(`${this.exchangeApiUrl}/Art/ArtList`, {}, {});
  }
  latestnews() {
    return this.http.post(`${this.exchangeApiUrl}/Index/latestnews`, {}, {});
  }
  articleView(id: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    return this.http.post(`${this.exchangeApiUrl}/Art/ArtShow`, formData, {});
  }
  marketticker() {
    return this.http.post(`${this.exchangeApiUrl}/Index/ticker`, {}, {});
  }
  markets() {
    return this.http.post(`${this.exchangeApiUrl}/Index/marketinfo`, {}, {});
  }
  marketswithbase(market: any) {
    return this.http.post(
      `${this.exchangeApiUrl}/Index/marketswithbase/market/${market}`,
      {},
      {}
    );
  }
  singlemarketinfo(market: any) {
    return this.http.post(
      `${this.exchangeApiUrl}/index/singlemarketinfo/market/${market}`,
      {},
      {}
    );
  }
  singleticker(id: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    return this.http.post(
      `${this.exchangeApiUrl}/Index/singlecoin`,
      formData,
      {}
    );
  }
  /*Affiliates */
  myaffiliateinfo() {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Affiliates/info`,
      {},
      { headers: myheader }
    );
  }
  invites() {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Affiliates/invites`,
      {},
      { headers: myheader }
    );
  }

  /*OTC Functions Start*/
  otcbaseprices() {
    return this.http.get(
      `https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,xrp`,
      {}
    );
  }
  otcindex() {
    return this.http.get(`${this.exchangeApiUrl}/Otc/index`, {});
  }

  otcrecords(ls = 15) {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Otc/records?ls=${ls}`,
      {},
      { headers: myheader }
    );
  }

  otclog(qid: any) {
    const myheader = this.getLoginHeader();

    return this.http.get(`${this.exchangeApiUrl}/Otc/log/qid/${qid}`, {
      headers: myheader,
    });
  }

  otcgetquote(trade_coin: string | Blob, base_coin: string | Blob, input1: string | Blob, input2: string | Blob, tradetype: string | Blob) {
    const myheader = this.getLoginHeader();
    const data = new FormData();
    data.append('trade_coin', trade_coin);
    data.append('base_coin', base_coin);
    data.append('input1', input1);
    data.append('input2', input2);
    data.append('tradetype', tradetype);
    return this.http.post(`${this.exchangeApiUrl}/Otc/getquote`, data, {
      headers: myheader,
    });
  }

  otcapprovequote(qid: any) {
    const myheader = this.getLoginHeader();

    return this.http.get(`${this.exchangeApiUrl}/Otc/approvequote/qid/${qid}`, {
      headers: myheader,
    });
  }
  /*OTC Functions End*/

  /*Exchange Functions*/
  lasttrades(market: any) {
    return this.http.post(
      `${this.exchangeApiUrl}/Exchange/lasttrades/market/${market}`,
      {},
      {}
    );
  }
  activeorders(market: any) {
    return this.http.post(
      `${this.exchangeApiUrl}/Exchange/activeorders/market/${market}`,
      {},
      {}
    );
  }
  myclosedorders(market: any) {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Exchange/MyClosedOrders/market/${market}`,
      {},
      { headers: myheader }
    );
  }
  myopenorders(market: any) {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Exchange/MyOpenOrders/market/${market}`,
      {},
      { headers: myheader }
    );
  }
  cancelentrust(id: any) {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Exchange/reject/id/${id}`,
      {},
      { headers: myheader }
    );
  }
  uptrade(price: string | Blob, qty: string | Blob, market: string | Blob, type: string | Blob) {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('price', price);
    formData.append('num', qty);
    formData.append('market', market);
    formData.append('type', type);
    return this.http.post(`${this.exchangeApiUrl}/Exchange/upTrade`, formData, {
      headers: myheader,
    });
  }
  upTradeV2(price: string | Blob, qty: string | Blob, market: string | Blob, type: string | Blob, stop: string | Blob, trade_type: string | Blob) {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('price', price);
    formData.append('num', qty);
    formData.append('market', market);
    formData.append('type', type);
    formData.append('stop', stop);
    formData.append('trade_type', trade_type);
    return this.http.post(`${this.exchangeApiUrl}/Exchange/upTrade`, formData, {
      headers: myheader,
    });
  }
  /* Exchange functions ends*/
  signup(username: string | Blob, password: string | Blob, email: string | Blob, code: string | Blob, invite: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('verify', code);
    formData.append('invit', invite);
    return this.http.post(
      `${this.exchangeApiUrl}/Login/emailregister`,
      formData,
      {}
    );
  }
  confirmcode(password: string | Blob, email: string | Blob, code: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('verify_code', code);

    return this.http.post(
      `${this.exchangeApiUrl}/Login/confirmcode`,
      formData,
      {}
    );
  }
  forgotcode(email: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.http.post(
      `${this.exchangeApiUrl}/Login/forgotcode`,
      formData,
      {}
    );
  }
  check2Fa(username: string ,password: string ,gacode: string ,) {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('gacode', gacode);
    return this.http.post(
      `${this.exchangeApiUrl}/Login/validate2fa`,
      formData,
      {}
    );
  }
  fundcode_receive() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Login/fundpasscode`, {
      headers: myheader,
    });
  }
  fundcode_confirm(password: string | Blob, code: string | Blob) {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('password', password);
    formData.append('verify_code', code);

    return this.http.post(
      `${this.exchangeApiUrl}/Login/confirmfundcode`,
      formData,
      { headers: myheader }
    );
  }
  exchange_wallet() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/wallet`, {
      headers: myheader,
    });
  }
  getLoginHeader() {
    const userdata = localStorage.getItem('userData');
    const xdata = JSON.parse(localStorage.getItem('userData'));

    if (!userdata) {
      //@todo you have been logged out send user to login page
      //location.reload();
      this.presentToast('You have been logged out!');
      // this.navCtrl.navigateRoot('/auth/login');
    }

    let headers = this.defaultHeaders;
    if (xdata && xdata.TOKEN !== undefined && xdata.TOKEN !== null) {
      headers = headers.set('TOKEN', String(xdata.TOKEN));
    } else {
      console.log('Token Expired');
      //@todo you have been logged out send user to login page
      // this.navCtrl.setRoot(LoginPage);
    }
    if (xdata && xdata.ID !== undefined && xdata.ID !== null) {
      headers = headers.set('ID', String(xdata.ID));
    } else {
      console.log('ID Expired');
      //   this.navCtrl.setRoot(LoginPage);
    }
    return headers;
  }
  exchange_userinfo() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/userinfo`, {
      headers: myheader,
    });
  }

  banners() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Art/bannerList`, {
      headers: myheader,
    });
  }
  appBanners() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Art/appBanners`, {
      headers: myheader,
    });
  }
  exchange_coinbalance(coin: any, ver: any) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/coinbalance/coin/${coin}/ver/${ver}`,
      {
        headers: myheader,
      }
    );
  }
  exchange_doWithdraw(fundpassword: any, sendAmount: any, coin_name: any, qrCode: any, network: any) {
    const postData = {
      coin: coin_name,
      num: sendAmount,
      addr: qrCode,
      paypassword: fundpassword,
      network: network
    };
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Crypto/doWithdraw`,
      JSON.stringify(postData),
      {
        headers: myheader,
      }
    );
  }
  exchange_basicpost(url: string, json_postData: any) {
    //url 'exchange/urlvariable'
    return this.http.post(
      `${this.exchangeApiUrl}/` + url,
      JSON.stringify(json_postData),
      {
        //      headers: headers,
      }
    );
  }
  exchange_post(url: string, json_postData: any) {
    const myheader = this.getLoginHeader();
    //url 'exchange/urlvariable'
    return this.http.post(
      `${this.exchangeApiUrl}/` + url,
      JSON.stringify(json_postData),
      {
        headers: myheader,
      }
    );
  }

  uppassword(oldPassword: string, newPassword: string) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/User/uppassword?oldpassword=${oldPassword}&newpassword=${newPassword}`,
      {
        headers: myheader,
      }
    );
  }

  kycStatus() {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Kyc/status`,
      {
        headers: myheader,
      }
    );
  }

  exchange_get(url: string) {
    const myheader = this.getLoginHeader();
    //url 'exchange/urlvariable'
    return this.http.get(`${this.exchangeApiUrl}/` + url, {
      headers: myheader,
    });
  }

  exchange_updatepass(curpass: any, newpass: any, repass: any) {
    const postData = {
      curpass: curpass,
      newpass: newpass,
      repass: repass,
    };
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/User/updatepass`,
      JSON.stringify(postData),
      {
        headers: myheader,
      }
    );
  }

  imageUpload(type, base64image) {
    const formData: FormData = new FormData();
    formData.append('type', type);
    formData.append('base64image', base64image);
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Kyc/imageupload`,
      formData,
      {
        headers: myheader,
      }
    );
  }

  docupload(idtype, idNumber, frontUploadURL, backUploadURL, selfieUploadURL) {
    const formData: FormData = new FormData();
    formData.append('idtype', idtype);
    formData.append('idcard', idNumber);
    formData.append('frontphoto', frontUploadURL);
    formData.append('backphoto', backUploadURL);
    formData.append('selfiephoto', selfieUploadURL);
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Kyc/docupload`,
      formData,
      {
        headers: myheader,
      }
    );
  }

  // Kyc/profile

  uploadProfileData(firstname, lastname, country, state, city, zip, gender, address, dob) {
    const formData: FormData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('zip', zip);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('dob', dob);
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Kyc/profile`,
      formData,
      {
        headers: myheader,
      }
    );
  }

  kyc_profile() {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Kyc/profile`,
      {
        headers: myheader,
      }
    );
  }

  exchange_addresses(coin: any) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/depositaddress/coin/${coin}`,
      {
        headers: myheader,
      }
    );
  }
  exchange_profile() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/profile`, {
      headers: myheader,
    });
  }
  securityCenter() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/securityCenter`, {
      headers: myheader,
    });
  }
  userfiatUpdate(fiat: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('fiat', fiat);
    const myheader = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/User/updateFiat`, formData, {
      headers: myheader,
    });
  }

  exchange_withdrawals(coin: string) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/MyWithdrawals/coin/${coin}`,
      {
        headers: myheader,
      }
    );
  }
  exchange_deposits(coin: string) {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Crypto/Mydeposits/coin/${coin}`,
      {},
      {
        headers: myheader,
      }
    );
  }

  fiatdeposits(coin: string) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/fiatDeposit/coinname/${coin}`,
      {
        headers: myheader,
      }
    );
  }
  fiatdepositinfo(id: any) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/viewFiatOrder/id/${id}`,
      {
        headers: myheader,
      }
    );
  }
  fiatmarkaspaid(id: any) {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Crypto/markAsPaid/id/${id}`, {
      headers: myheader,
    });
  }

  fiatdeposithistory(coin: string) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/fiatDepositHistory/coinname/${coin}`,
      {
        headers: myheader,
      }
    );
  }
  fiatout(coin: string) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/fiatWithdrawal/coin/${coin}`,
      {
        headers: myheader,
      }
    );
  }
  dofiatout(num: string | Blob, paypassword: string | Blob, type: string | Blob, coinname: string | Blob) {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('num', num);
    formData.append('paypassword', paypassword);
    formData.append('type', type);
    formData.append('coinname', coinname);
    return this.http.post(
      `${this.exchangeApiUrl}/Crypto/doFiatWithdrawal`,
      formData,
      {
        headers: myheader,
      }
    );
  }

  fiatoutlog(coin: string) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/fiatoutlog/coinname/${coin}`,
      {
        headers: myheader,
      }
    );
  }

  getCoinNetworks(coin: string) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/crypto/getCoinNetworks/coin/${coin}`,
      {
        headers: myheader,
      }
    );
  }

  cancelFiatOut(id: any) {
    const myheader = this.getLoginHeader();
    return this.http.get(
      `${this.exchangeApiUrl}/Crypto/cancelFiatOut/id/${id}`,
      {
        headers: myheader,
      }
    );
  }

  doFiatdeposit(type: string | Blob, num: string | Blob, coinname: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('type', type);
    formData.append('num', num);
    formData.append('coinname', coinname);
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Crypto/fiatDepositUp`,
      formData,
      {
        headers: myheader,
      }
    );
  }
  /*Bank Management */

  banklist() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Crypto/banklist/`, {
      headers: myheader,
    });
  }
  delbank(id: any) {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Crypto/delbank/id/${id}`, {
      headers: myheader,
    });
  }

  addbank() {
    const myheader = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Crypto/addbank`, {
      headers: myheader,
    });
  }

  doAddBank(
    name: string | Blob,
    bank: string | Blob,
    bankprov: string | Blob,
    bankcity: string | Blob,
    bankaddr: string | Blob,
    bankcard: string | Blob,
    paypassword: string | Blob,
    truename: string | Blob
  ) {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('bank', bank);
    formData.append('bankprov', bankprov);
    formData.append('bankcity', bankcity);
    formData.append('bankaddr', bankaddr);
    formData.append('bankcard', bankcard);
    formData.append('paypassword', paypassword);
    formData.append('truename', truename);
    const myheader = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Crypto/doAddBank`, formData, {
      headers: myheader,
    });
  }
  submitkyc(
    frontphoto: string | Blob,
    backphoto: string | Blob,
    addressphoto: string | Blob,
    selfiephoto: string | Blob,
    address: string | Blob,
    idcard: string | Blob,
    idinfo: string | Blob,
    truename: string | Blob
  ) {
    const formData: FormData = new FormData();
    formData.append('frontphoto', frontphoto);
    formData.append('backphoto', backphoto);
    formData.append('addressphoto', addressphoto);
    formData.append('selfiephoto', selfiephoto);
    formData.append('address', address);
    formData.append('idcard', idcard);
    formData.append('idinfo', idinfo);
    formData.append('truename', truename);

    const myheader = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/User/submitkyc`, formData, {
      headers: myheader,
    });
  }
  ImageUpload(type: string | Blob, base64image: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('type', type);
    formData.append('base64image', base64image);

    const myheader = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/User/imageupload`, formData, {
      headers: myheader,
    });
  }

  yoco_process(id: string | Blob, token: string | Blob, amount: string | Blob) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('token', token);
    formData.append('amount', amount);
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/Crypto/yocoprocess`,
      formData,
      {
        headers: myheader,
      }
    );
  }

  news_list() {
    return this.http.get(`${this.exchangeApiUrl}/Art/NewsList`, {});
  }

  annoucements(){
    return this.http.get(`${this.exchangeApiUrl}/Art/annoucements`, {});
  }
  changeFav(market: string | Blob, action: string | Blob) {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('action', action);
    formData.append('coinType', market);
    return this.http.post(`${this.exchangeApiUrl}/User/star`, formData, {
      headers: myheader,
    });
  }
  fav_markets() {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('action', 'find');
    return this.http.post(`${this.exchangeApiUrl}/User/star`, formData, {
      headers: myheader,
    });
  }
  checkFavMarket(market: string | Blob) {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('action', 'check');
    formData.append('coinType', market);
    return this.http.post(`${this.exchangeApiUrl}/User/star`, formData, {
      headers: myheader,
    });
  }
  filtermarket(type: string | Blob, filter: string | Blob) {
    const myheader = this.getLoginHeader();
    const formData: FormData = new FormData();
    formData.append('filter', filter);
    formData.append('type', type);
    return this.http.post(
      `${this.exchangeApiUrl}/Index/filterMarket`,
      formData,
      { headers: myheader }
    );
  }
  /*Affiliates */
  desktop_login(desktop_ip: any, qr_secure: any) {
    const myheader = this.getLoginHeader();
    return this.http.post(
      `${this.exchangeApiUrl}/User/qrlogin`,
      { desktop_ip: desktop_ip, qr_secure: qr_secure },
      { headers: myheader }
    );
  }
  async presentToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000,
    });
    toast.present();
  }

  // Voting APIs start here
  votingIndex() {
    return this.http.get(`${this.exchangeApiUrl}/Vote/index`, {});
  }

  votingLog() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Vote/log`, { headers: defaultHeaders });
  }

  votingUp(type: any, id: any) {
    // `type` will be 1 if upvote or 2 if downvote
    // `id` will be the id of vote that is getting upvoted or downvoted
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('type', type);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Vote/up`, formData, { headers: defaultHeaders });
  }

  // Voting APIs end here

  // Staking APIs start here

  stakingIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Staking/index`, { headers: defaultHeaders });
  }

  stakingLog() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Staking/logs`, { headers: defaultHeaders });
  }

  stakingCreate(id: any, amount: any, period: any) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('amount', amount);
    formData.append('period', period);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Staking/createStaking`, formData, { headers: defaultHeaders });
  }

  stakingWithdraw(docID: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Staking/withdraw/docid/${docID}`, { headers: defaultHeaders });
  }

  // Staking APIs end here

  // Mining/Pool APIs start here

  miningIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Pool/index`, {}, { headers: defaultHeaders });
  }

  miningRewards() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Pool/myRewards`, {}, { headers: defaultHeaders });
  }

  miningMachines() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Pool/myMachines`, {}, { headers: defaultHeaders });
  }

  miningRentMachine(num: any, id: any) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('num', num);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Pool/rentMachine`, formData, { headers: defaultHeaders });
  }

  miningStartMachine(id: any) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Pool/startMachine`, formData, { headers: defaultHeaders });
  }

  miningClaimRewards(num: any, id: any) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('num', num);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Pool/claimReward`, formData, { headers: defaultHeaders });
  }

  // Mining/Pool apis end here

  // Airdrop apis start here

  airdropIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Airdrop/index`, { headers: defaultHeaders });
  }

  // Airdrop apis end here

  // Faucet apis start here

  faucetIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Faucet/index`, { headers: defaultHeaders });
  }

  faucetRecentUses(numbers: any = 20) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Faucet/recentUses?ls=${numbers}`, { headers: defaultHeaders });
  }

  faucetSingleInfo(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Faucet/singleFaucetInfo?id=${id}`, { headers: defaultHeaders });
  }

  faucetLogs(numbers: any = 20) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Faucet/myLogs?ls=${numbers}`, { headers: defaultHeaders });
  }

  faucetClaimLogs(numbers: any = 20) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Faucet/claimLogs?ls=${numbers}`, { headers: defaultHeaders });
  }

  faucetClaim(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Faucet/claim?id=${id}`, { headers: defaultHeaders });
  }

  // Faucet apis end here

  // New Wallet apis start here

  userAssets(type: string) {
    const formData: FormData = new FormData();
    formData.append('type', type);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Transfer/doTransfer`, formData, { headers: defaultHeaders });
  }

  userWallet() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/assets`, { headers: defaultHeaders });
  }

  // New Wallet apis end here

  // Gift card apis start here
  TransferIndex(from: string = "p2p", to: string = "spot") {
    const formData: FormData = new FormData();
    formData.append('to', to);
    formData.append('from', from);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Transfer/index`, formData, { headers: defaultHeaders });
  }

  doTransfer(from: string, to: string, coin: string, amount: any) {
    const formData: FormData = new FormData();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('coin', coin);
    formData.append('amount', amount);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Transfer/doTransfer`, formData, { headers: defaultHeaders });
  }

  walletTransferHistory() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Transfer/history`, { headers: defaultHeaders });
  }

  giftIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Transfer/giftcard`, { headers: defaultHeaders });
  }

  giftcardTemplateIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Transfer/giftcardTemplate`, { headers: defaultHeaders });
  }

  giftCreate(coin: string, amount: any, bannerId: any, nonce: any) {
    const formData: FormData = new FormData();
    formData.append('coin', coin);
    formData.append('amount', amount);
    formData.append('bannerId', bannerId);
    formData.append('nonce', nonce);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Transfer/giftcardcreate`, formData, { headers: defaultHeaders });
  }

  giftCheck(public_code: string) {
    const formData: FormData = new FormData();
    formData.append('public_code', public_code);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Transfer/check`, formData, { headers: defaultHeaders });
  }

  giftRedeem(public_code: string, secret_code: string) {
    const formData: FormData = new FormData();
    formData.append('public_code', public_code);
    formData.append('secret_code', secret_code);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Transfer/redeem`, formData, { headers: defaultHeaders });
  }

  giftDoBuy(coin: string, amount: any, bannerId: any, nonce: any) {
    const formData: FormData = new FormData();
    formData.append('coin', coin);
    formData.append('amount', amount);
    formData.append('bannerId', bannerId);
    formData.append('nonce', nonce);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Transfer/doBuy`, formData, { headers: defaultHeaders });
  }

  // Gift card apis ends here

  // Store apis starts here

  storeIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Shop/index`, { headers: defaultHeaders });
  }

  storeViewItem(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Shop/viewItem/?id=${id}`, { headers: defaultHeaders });
  }

  storeOrders(numbers: any = 20) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Shop/orders/?numbers=${numbers}`, { headers: defaultHeaders });
  }

  storeAddress() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Shop/address`, { headers: defaultHeaders });
  }

  storeAddressCreate(truename: string, cellphone: any, address: any, city: any) {
    const formData: FormData = new FormData();
    formData.append('truename', truename);
    formData.append('cellphone', cellphone);
    formData.append('address', address);
    formData.append('city', city);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Shop/addAddress`, formData, { headers: defaultHeaders });
  }

  storeDeleteAddress(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Shop/delAddress?id=${id}`, { headers: defaultHeaders });
  }

  storeBuyItem(id: any, num: any, address_id: any) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('num', num);
    formData.append('address_id', address_id);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Shop/buyItem`, formData, { headers: defaultHeaders });
  }

  storeCancelOrder(id: any) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Shop/cancelOrder`, formData, { headers: defaultHeaders });
  }

  // Store apis ends here

  // P2P apis starts here

  p2pIndex(type: any, fiat: any, coin: any) {
    const formData: FormData = new FormData();
    formData.append('type', type);
    formData.append('fiat', fiat);
    formData.append('coin', coin);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/index`, formData, { headers: defaultHeaders });
  }

  p2pDoTrade(paywith: any, amount: any, paymethod: any, id: any, type: any, method: any) {
    // order_type 1=buy , 2=sell
    const formData: FormData = new FormData();
    formData.append('paywith', paywith);
    formData.append('amount', amount);
    formData.append('paymethod', paymethod);
    formData.append('id', id);
    formData.append('type', type);
    formData.append('method', method);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/doTrade`, formData, { headers: defaultHeaders });
  }

  p2pExpress(type: any, fiat: any, coin: any, fiat_qty: any) {
    // order_type 1=buy , 2=sell
    const formData: FormData = new FormData();
    formData.append('type', type);
    formData.append('fiat', fiat);
    formData.append('coin', coin);
    formData.append('fiat_qty', fiat_qty);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/express`, formData, { headers: defaultHeaders });
  }

  p2pSendChat(orderid: any, content: any) {
    const formData: FormData = new FormData();
    formData.append('orderid', orderid);
    formData.append('content', content);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/sendchat`, formData, { headers: defaultHeaders });
  }

  p2pdoNewAd(fiat: any,
    coin: any,
    amount: any,
    price_type: any,
    fixed_price: any,
    ad_type: any,
    floating: any,
    available: any,
    time_limit: any,
    min_limit: any,
    max_limit: any,
    terms: any,
    autoreply: any,
    cond_kyc: any,
    cond_reg: any,
    cond_reg_ago: any,
    cond_balance: any,
    cond_min_bal: any,
    online: any,
    bankList: any) {
    const formData: FormData = new FormData();
    formData.append('fiat', fiat);
    formData.append('coin', coin);
    formData.append('amount', amount);
    formData.append('price_type', price_type);
    formData.append('fixed_price', fixed_price);
    formData.append('ad_type', ad_type);
    formData.append('floating', floating);
    formData.append('available', available);
    formData.append('time_limit', time_limit);
    formData.append('min_limit', min_limit);
    formData.append('max_limit', max_limit);
    formData.append('terms', terms);
    formData.append('autoreply', autoreply);
    formData.append('cond_kyc', cond_kyc);
    formData.append('cond_reg', cond_reg);
    formData.append('cond_reg_ago', cond_reg_ago);
    formData.append('cond_balance', cond_balance);
    formData.append('cond_min_bal', cond_min_bal);
    formData.append('online', online);
    formData.append('bankList', bankList);
    formData.append('fixed_price', fixed_price);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/doNewAd`, formData, { headers: defaultHeaders });
  }


  p2pNewAd(paywith: any, amount: any, order_type: any, paymethod: any, id: any, type: any) {
    const formData: FormData = new FormData();
    formData.append('paywith', paywith);
    formData.append('amount', amount);
    formData.append('order_type', order_type);
    formData.append('paymethod', paymethod);
    formData.append('id', id);
    formData.append('type', type);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/newad`, formData, { headers: defaultHeaders });
  }

  p2pGetChat(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/getChat?id=${id}`, { headers: defaultHeaders });
  }

  p2pViewOrder(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/vieworder?id=${id}`, { headers: defaultHeaders });
  }

  p2pMarkAsPaid(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/markAsPaid?id=${id}`, { headers: defaultHeaders });
  }

  p2pOrderCancel(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/confirmCancel?id=${id}`, { headers: defaultHeaders });
  }

  p2pDisput(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/dispute?id=${id}`, { headers: defaultHeaders });
  }

  p2pQuick() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/quick`, { headers: defaultHeaders });
  }

  p2pApply() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/apply`, { headers: defaultHeaders });
  }

  p2pDoApply() {
    // paywith: any, amount: any, order_type: any, paymethod: any, id: any, type: any
    // TODO: Change params
    // const formData: FormData = new FormData();
    // formData.append('paywith', paywith);
    // formData.append('amount', amount);
    // formData.append('order_type', order_type);
    // formData.append('paymethod', paymethod);
    // formData.append('id', id);
    // formData.append('type', type);
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/doApply`, { headers: defaultHeaders });
  }

  p2pGetOrderStatusAjax(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/getOrderStatusAjax?id=${id}`, { headers: defaultHeaders });
  }

  p2pReceivedOrderInfo(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/receivedorder?id=${id}`, { headers: defaultHeaders });
  }

  p2pOrders() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/orders`, { headers: defaultHeaders });
  }

  p2pReceivedOrders() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/received`, { headers: defaultHeaders });
  }

  p2pPaymentSettings() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/paymentsettings`, { headers: defaultHeaders });
  }

  p2pMyAds() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/myads`, { headers: defaultHeaders });
  }

  p2pFaq() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/faq`, { headers: defaultHeaders });
  }

  p2pDelUserMethod(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/del_user_method?id=${id}`, { headers: defaultHeaders });
  }

  p2pDelBank(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/delbank?id=${id}`, { headers: defaultHeaders });
  }

  p2pCryptoList(id: any) {
    // TODO: Change params
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/P2p/cryptosList?id=${id}`, { headers: defaultHeaders });
  }

  p2pCloseListing(ad_number: any) {
    const formData: FormData = new FormData();
    formData.append('ad_number', ad_number);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/closelisting`, formData, { headers: defaultHeaders });
  }

  p2pUserAddMethod(method: any, information: any) {
    const formData: FormData = new FormData();
    formData.append('method', method);
    formData.append('information', information);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/user_add_method`, formData, { headers: defaultHeaders });
  }

  p2pUserAddBankMethod(bank: any, bic: any, account_number: any) {
    const formData: FormData = new FormData();
    formData.append('bank', bank);
    formData.append('bic', bic);
    formData.append('account_number', account_number);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/doAddBank`, formData, { headers: defaultHeaders });
  }

  p2pDoAddBank(bank: any, bic: any, account_number: any) {
    const formData: FormData = new FormData();
    formData.append('bank', bank);
    formData.append('bic', bic);
    formData.append('account_number', account_number);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/doAddBank`, formData, { headers: defaultHeaders });
  }

  p2pDoEditBank(bank: any, bic: any, account_number: any) {
    const formData: FormData = new FormData();
    formData.append('bank', bank);
    formData.append('bic', bic);
    formData.append('account_number', account_number);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/doEdit`, formData, { headers: defaultHeaders });
  }

  p2pGrabPrice(crypto: any, fiat: any) {
    const formData: FormData = new FormData();
    formData.append('crypto', crypto);
    formData.append('fiat', fiat);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/P2p/grabPrice`, formData, { headers: defaultHeaders });
  }

  // P2P apis ends here

  // Convert apis start here

  convertIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Convert/index`, { headers: defaultHeaders });
  }

  convertDoTrade(from_coin: string, to_coin: any, amount: any) {
    const formData: FormData = new FormData();
    formData.append('from_coin', from_coin);
    formData.append('to_coin', to_coin);
    formData.append('amount', amount);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Convert/doTrade`, formData, { headers: defaultHeaders });
  }

  // Convert apis end here

  // ICO apis start here

  icoIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Issue/index`, { headers: defaultHeaders });
  }

  icoView(id: any) {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Issue/view?id=${id}`, { headers: defaultHeaders });
  }

  icoLogs() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/Issue/myLogs`, { headers: defaultHeaders });
  }

  icoDoBuy(id: any, num: any, paypassword: any, selected_coin: any) {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('num', num);
    formData.append('paypassword', paypassword);
    formData.append('selected_coin', selected_coin);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/Issue/doBuy`, formData, { headers: defaultHeaders });
  }

  // ICO apis end here

  // Freeze apis start here

  freezeReasons() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/freezeReasons`, { headers: defaultHeaders });
  }

  doFreeze(reason: string, code: string = "freeze") {
    const formData: FormData = new FormData();
    formData.append('reason', reason);
    formData.append('code', code);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/User/doFreeze`, formData, { headers: defaultHeaders });
  }

  // Freeze apis end here

  // Anti fishing apis start here

  antiFishingIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/antiphishing`, { headers: defaultHeaders });
  }

  updateAntiFishing(antiphishing: string) {
    const formData: FormData = new FormData();
    formData.append('antiphishing', antiphishing);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/User/updateAntiphishing`, formData, { headers: defaultHeaders });
  }

  // Anti fishing apis end here

  // Anti fishing apis start here

  google2FaIndex() {
    const defaultHeaders = this.getLoginHeader();
    return this.http.get(`${this.exchangeApiUrl}/User/GetSet2FA`, { headers: defaultHeaders });
  }

  updateGoogle2fa(ga,type,ga_login,ga_transfer) {
    const formData: FormData = new FormData();
    formData.append('ga',ga);
    formData.append('type',type);
    formData.append('ga_login',ga_login);
    formData.append('ga_transfer',ga_transfer);
    const defaultHeaders = this.getLoginHeader();
    return this.http.post(`${this.exchangeApiUrl}/User/GetSet2FA`, formData, { headers: defaultHeaders });
  }

  // Anti fishing apis end here

  // Utils

  getUserName() {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
    if (userDataFromLocalStorage?.username) {
      return userDataFromLocalStorage.username
    }
    return null
  }

}

