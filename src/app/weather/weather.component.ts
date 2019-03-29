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
  time = [];
  temp = {
    day: [],
    night: [],
    eve: [],
    morn: []
  };
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
      this.getAllData(data.id).subscribe(data => {
        data.list.map(it => {
          console.log(it)
          this.time.push(new Date(it.dt).getMinutes())
          this.temp.day.push(it.temp.day)
          this.temp.eve.push(it.temp.eve)
          this.temp.night.push(it.temp.night)
          this.temp.morn.push(it.temp.morn)
        })
        this.generateChart();
      })
    })
   
  }
  getData(city) {
    let url = `https://openweathermap.org/data/2.5/weather?q=${city}&appid=b6907d289e10d714a6e88b30761fae22&id=3449319`;
    return this.http.get(url).pipe(map((res: Response) => res.json()));
  }
  getAllData(id) {
    let url = `https://openweathermap.org/data/2.5/forecast/daily/?appid=b6907d289e10d714a6e88b30761fae22&id=${id}&units=metric`;
    return this.http.get(url).pipe(map((res: Response) => res.json()));
  }

  generateChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.time,
        datasets: [
          {
            data: this.temp.day,
            label: 'afternoon',
            borderColor: '#e6e600',
            fill: false
          },
          {
            data: this.temp.eve,
            label: 'evening',
            borderColor: '#990073',
            fill: false
          },
          {
            data: this.temp.morn,
            label: 'morning',
            borderColor: '#b30000',
            fill: false
          },
          {
            data: this.temp.night,
            label: 'night',
            borderColor: '#00802b',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true,
          label: 'fsd'

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
