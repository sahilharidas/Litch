import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Country, CountryHistory } from '../data-viewer/model';
import { DataService } from 'src/app/data.service';
import { Chart } from 'chart.js';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {
  countries: Country[];
  selectedCountry: Country;
  initialCountry = 'South Africa'

  countryHistory: CountryHistory
  countryHistX: Array<string> = [];
  countryCasesY: Array<number> = [];
  countryDeathsY: Array<number> = [];
  countryRecoveredY: Array<number> = [];
  
  options: string[];
  filteredOptions$: Observable<string[]>;

  graphs: Array<Chart> = [];
  constructor(private dataService: DataService) { }

  @ViewChild('autoInput') input;

  ngOnInit(): void {

    this.dataService.getCountries()
    .subscribe(data => {
      this.countries = data
      this.addCountries();
      this.setCountry(this.initialCountry);
      this.graphData(this.initialCountry);
    });

  }

  addCountries(): void {
    // populates countries array using countries from API
    this.options = [];
    for (let c of this.countries) {
      this.options.push(c.country);
    }
    this.filteredOptions$ = of(this.options);
  }

  setCountry(name: string): void {
    for (let c of this.countries) {
      if (c.country == name) {
        this.selectedCountry = c;
      }
    }
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
    this.setCountry($event);
    this.graphData($event, true);
  }

  graphData(country: string, update: boolean = false): void {
    // gets historical data by country from John-Hopkins University, data sourced every 10 minutes
    this.dataService.getCountriesHistory(country)
    .subscribe(data => {
      var skip = false;
      this.countryHistX = [];
      this.countryCasesY = [];
      this.countryDeathsY = [];
      this.countryRecoveredY = [];
        for (let d in data.timeline.cases) {
          if (!skip) {
            this.countryHistX.push(d);
            this.countryCasesY.push(data.timeline.cases[d] as number);
            this.countryDeathsY.push(data.timeline.deaths[d] as number);
            this.countryRecoveredY.push(data.timeline.recovered[d] as number);
          }
          skip == true ? skip = false  : skip = true;
        }
        if (update) {
          // changes data to be graphed on change in country
          this.updateGraph(this.graphs[0], this.countryHistX, this.countryCasesY);
          this.updateGraph(this.graphs[1], this.countryHistX, this.countryDeathsY);
          this.updateGraph(this.graphs[2], this.countryHistX, this.countryRecoveredY);
          this.updateGraph(this.graphs[3], this.countryHistX, this.countryCasesY);
          this.updateGraph(this.graphs[4], this.countryHistX, this.countryDeathsY);
          this.updateGraph(this.graphs[5], this.countryHistX, this.countryRecoveredY);
        } else {
          // draws initial graphs based on default country
          this.drawGraph('dailyCasesLine', this.countryCasesY, [0, 149, 255], 'linear');
          this.drawGraph('dailyDeathsLine', this.countryDeathsY, [255, 61, 113], 'linear');
          this.drawGraph('dailyRecoveredLine', this.countryRecoveredY, [0, 214, 143], 'linear');
          this.drawGraph('dailyCasesLog', this.countryCasesY, [0, 149, 255], 'logarithmic');
          this.drawGraph('dailyDeathsLog', this.countryDeathsY, [255, 61, 113], 'logarithmic');
          this.drawGraph('dailyRecoveredLog', this.countryRecoveredY, [0, 214, 143], 'logarithmic');
        }
    });
  }

  // graph template using Chartjs
  drawGraph(id: string, yData: number[], [r, g, b]: number[], type: string): void {
    var ctx = document.getElementById(id);
    var graph  = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.countryHistX,
            datasets: [{
                data: yData,
                backgroundColor: 
                  `rgba(${r}, ${g}, ${b}, 0.2)`,
                borderColor:
                  `rgba(${r}, ${g}, ${b}, 1)`,
                borderWidth: 3
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    type: type,
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return Number(value.toString());
                        }, 
                    }
                }]
            }
        }
    });
    this.graphs.push(graph);
  }

  // updates graphing data given x and y axis values
  updateGraph(chart: Chart, xData: string[], yData: number[]): void {
    chart.data.labels = xData;
    chart.data.datasets[0].data = yData;
    chart.update();
}

}