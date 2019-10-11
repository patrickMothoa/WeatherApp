import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  constructor(public http : HttpClient) { }
   
  Cities = [];

  city = " "
  myWeather(city){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=21ddb74fcf7270634d0b3138b6a0fdd4')
  }

  getCity(){
    return this.Cities;
  }
}
