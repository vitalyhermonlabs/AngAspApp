import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast')    // OK
    //this.http.get<WeatherForecast[]>('/WeatherForecast/Get')  // 404 (Not Found)
      .subscribe(
        (result) => {
          this.forecasts = result;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  title = 'angaspapp.client';

  onTest() {
    console.log('onTest');

    this.http.post<string>('/WeatherForecast/Test', { id: 132 })
      .subscribe({
        next: (result) => {
          console.log('result:', result);
        },
        error: err => console.error(err)
      });
  }

}
