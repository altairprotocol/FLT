import { Injectable } from '@angular/core';
import { Observable, Subject, filter, retry } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private wsSubject: WebSocketSubject<any>;
  private subject: Subject<any> = new Subject<any>();

  constructor() { }

  connect(wsUrl: string) {
    if (!this.wsSubject || this.wsSubject.closed) {
      this.wsSubject = webSocket(wsUrl);

      this.wsSubject.pipe(
        retry(5)
      ).subscribe(
        message => this.subject.next(message),
        err => console.error(err),
        () => console.warn('WebSocket connection closed')
      );
    }
  }

  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }

  sendMessage(msg: any) {
    if (this.wsSubject) {
      this.wsSubject.next(msg);
    }
  }

  close() {
    if (this.wsSubject) {
      this.wsSubject.complete();
    }
  }

  getFilteredMessages(pairs: string[], type: string = 'newprice'): Observable<any> {
    return this.subject.asObservable().pipe(filter(message => message.type === type && pairs.includes(message.market))
    );
  }
}
