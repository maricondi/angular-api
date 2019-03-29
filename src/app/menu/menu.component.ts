import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() handleSearchNews = new EventEmitter();
  @Output() handleCategoryNews = new EventEmitter();
  @Output() handleSearchWeatherCity = new EventEmitter();
  @Input() weatherInput;

  constructor() { }

  ngOnInit() {
  }

  hookSearchNews(word) {
    this.handleSearchNews.emit(word);
  }

  hookSearchWeatherCity(city) {
    this.handleSearchWeatherCity.emit(city);
  }

  hookCategoryNews(category) {
    this.handleCategoryNews.emit(category);
  }

  title = "Angular News";
}
