import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() handleSearchNews = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  hookSearchNews(word) {
    this.handleSearchNews.emit(word);
  }

  title = "Angular News";
}
