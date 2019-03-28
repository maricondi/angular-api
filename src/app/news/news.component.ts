import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private country: string = 'br';
  newsData: any = {};

  constructor(private http: Http) {
    this.getNews('all', false);
  }

  ngOnInit(){
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
      url = `https://newsapi.org/v2/everything?q=${anything}&apiKey=cbc77ffdcac340f38dfdcbb2860d4e33`;
    } else {
      url = `https://newsapi.org/v2/everything?q=${anything}&apiKey=cbc77ffdcac340f38dfdcbb2860d4e33`;
    }
    this.getData(url).subscribe(data => {
      this.newsData = data;
    })
  }
  
  onSearchNews(word) {
    this.getNews(word, true);
  }

}
