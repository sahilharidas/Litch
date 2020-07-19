import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global, Country, History } from './pages/data-viewer/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dailyUrl = 'https://api.covid19api.com/total/dayone/country/south-africa';
  liveUrl = 'https://api.covid19api.com/live/country/south-africa/status/confirmed';
  apiUrl = 'https://api.covid19api.com/summary';

  countriesURL = 'https://corona.lmao.ninja/v3/covid-19/countries'
  globalURL = 'https://corona.lmao.ninja/v3/covid-19/all'
  globalHistoryURL = "https://corona.lmao.ninja/v3/covid-19/historical/all?lastdays=all"

  constructor(private _http: HttpClient) { }

  getCountries() {
    return this._http.get<Country[]>(this.countriesURL);
  }

  getGlobal() {
    return this._http.get<Global>(this.globalURL);
  }

  getGlobalHistory() {
    return this._http.get<History>(this.globalHistoryURL);
  }

  getGlobalHist() {
    return this._http.get(this.globalHistoryURL);
  }
}
