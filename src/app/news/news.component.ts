import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";

import * as _ from 'underscore';
import { PagerService } from '../_services/index';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private country: string = 'br';
  private newsData: any = {};

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

  constructor(private http: Http, private pagerService: PagerService) {
    this.getNews('all', true);
  }

  ngOnInit(){
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.newsData.articles.length, page);
    // get current page of items
    this.pagedItems = this.newsData.articles.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  getData(url) {
    return this.http.get(url).pipe(map((res: Response) => res.json()));
  }
  getNews(anything, search) {
    let url = null;
    if(search) {
      if(anything == ''){
        anything = 'all';
      }
      url = `https://newsapi.org/v2/everything?q=${anything}&language=pt&apiKey=cbc77ffdcac340f38dfdcbb2860d4e33`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=br&category=${anything}&apiKey=cbc77ffdcac340f38dfdcbb2860d4e33`;
    }
    this.getData(url).subscribe(data => {
      this.newsData = data;
      this.setPage(1);
    })
  }
  
  onSearchNews(word) {
    this.getNews(word, true);
  }

  onCategoryNews(category) {
    this.getNews(category, false);
  }

}
