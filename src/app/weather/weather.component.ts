import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private apiUrl = 'http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&APPID=27a35bd8cd1ef31c4ff035e7e5603102';

}
