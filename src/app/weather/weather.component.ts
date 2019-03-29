import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherData = []; 
  chart = [];
  day = ["Monday", "Thursday", "Saturday"];
  temp = [29, 31, 18];
  defaultCity = 'São Paulo';
  isWeather = true;

  constructor(private http: Http) {
    this.getWeather(this.defaultCity);
  }

  ngOnInit() {
  }

  onSearchWeatherCity(city) {
    this.getWeather(city);
  }

  getWeather(city) {
    this.getData(city).subscribe(data => {
     this.weatherData = data;
     this.generateChart(data);
    })
  }
  getData(city) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=27a35bd8cd1ef31c4ff035e7e5603102`
    return this.http.get(url).pipe(map((res: Response) => res.json()));
  }
  generateChart(data) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.day,
        datasets: [
          {
            data: this.temp,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    })
  }

}
