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
    // totals for all countries for yesterday and today from Worldometers, updated every 10 minutes
    return this._http.get<Country[]>(this.countriesURL);
  }

  getCountriesHistory(country: string) {
    // historical data for a specific country since the pandemic began from JHUCSSE
    return this._http.get<CountryHistory>(this.countriesHistoryURL + country + '?lastdays=all');
  }

  getGlobal() {
    // global totals for yesterday and today from Worldometers, updated every 10 minutes
    return this._http.get<Global>(this.globalURL);
  }

  getGlobalHistory() {
    // historical data for all countries since the pandemic began from JHUCSSE
    return this._http.get<History>(this.globalHistoryURL);
  }
}
