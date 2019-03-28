import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=cbc77ffdcac340f38dfdcbb2860d4e33';
  newsData: any = {};
  published = null;

  constructor(private http: Http) {
    this.getData();
    this.getNews();
  }

  ngOnInit(){
  }

  getData() {
    return this.http.get(this.apiUrl).pipe(map((res: Response) => res.json()));
  }
  getNews() {
    this.getData().subscribe(data => {
      this.newsData = data;
    })
  }

}
