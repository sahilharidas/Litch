import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global, Country, History, CountryHistory } from './pages/data-viewer/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  countriesURL = 'https://corona.lmao.ninja/v3/covid-19/countries'
  countriesHistoryURL = 'https://corona.lmao.ninja/v3/covid-19/historical/'
  globalURL = 'https://corona.lmao.ninja/v3/covid-19/all'
  globalHistoryURL = "https://corona.lmao.ninja/v3/covid-19/historical/all?lastdays=all"

  constructor(private _http: HttpClient) { }

  getCountries() {
    return this._http.get<Country[]>(this.countriesURL);
  }

  getCountriesHistory(country: string) {
    return this._http.get<CountryHistory>(this.countriesHistoryURL + country + '?lastdays=all');
  }

  getGlobal() {
    return this._http.get<Global>(this.globalURL);
  }

  getGlobalHistory() {
    return this._http.get<History>(this.globalHistoryURL);
  }
}
