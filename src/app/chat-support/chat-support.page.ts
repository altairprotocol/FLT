import { Component, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-support',
  templateUrl: './chat-support.page.html',
  styleUrls: ['./chat-support.page.scss'],
})
export class ChatSupportPage implements OnInit {

  script = this._renderer.createElement('script');
  tawkID: string;
  subTawkID: string;

  constructor(private _renderer: Renderer2, @Inject(DOCUMENT) private _document, private location: Location) {
    this.tawkID = environment.tawkID
    this.subTawkID = environment.subTawkID
  }

  ngOnInit() {
    this.script.text = `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/${this.tawkID}/${this.subTawkID}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
}
)();`;
    this._renderer.appendChild(this._document.body, this.script);
    // console.log(window.Tawk_API.isChatMaximized());
    this.openChat()

  }

  back() {
    this.location.back();
  }

  openChat() {
    console.log(this._document);

    // this._document.Tawk_API.maximize();
  }
}
