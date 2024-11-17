import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
const apiUrl = environment.exchangeUrl  +environment.apiFolder+'/';

// TYPES

interface Credentials {
  username: string | null;
  password: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {
    console.log('Hello AuthService Provider');
  }
  postData(credentials: Credentials, type: string) {
    //let headers = new Headers();
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, JSON.stringify(credentials), {}).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
