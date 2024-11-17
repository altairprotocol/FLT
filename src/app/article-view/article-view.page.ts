import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.page.html',
  styleUrls: ['./article-view.page.scss'],
})
export class ArticleViewPage implements OnInit {
  newsItem: any = null

  constructor(private location: Location, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.newsItem = params?.newsItem ? JSON.parse(params.newsItem) : null
      }
    });
  }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

}
