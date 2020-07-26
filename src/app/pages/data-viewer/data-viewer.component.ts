import { Component, OnInit, ViewChild } from '@angular/core';
import { Global, Country, History } from './model';
import { DataService } from 'src/app/data.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.scss']
})
export class DataViewerComponent implements OnInit {
    
  globeHistory: History;
  globeHistX: Array<string> = [];
  globeCasesY: Array<number> = [];
  globeDeathsY: Array<number> = [];
  globeRecoveredY: Array<number> = [];
  skip: boolean;

  global: Global;
  countries: Country[];
  displayedColumns: string[] = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths',
                            'recovered', 'todayRecovered', 'tests', 'active', 'critical',
                            'casesPerOneMillion', 'deathsPerOneMillion', 'testsPerOneMillion'];
  dataSource = new MatTableDataSource<Country>(this.countries);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DataService) { }
  

  ngOnInit() {
    // gets historical data globally from John-Hopkins University, data sourced every 10 minutes
    this.dataService.getGlobalHistory()
    .subscribe(data => {
        this.skip = false;
        for (let d in data.cases) {
            if (!this.skip) {
                this.globeHistX.push(d);
                this.globeCasesY.push(data.cases[d] as number);
                this.globeDeathsY.push(data.deaths[d] as number);
                this.globeRecoveredY.push(data.recovered[d] as number);
            }
            this.skip == true ? this.skip = false  : this.skip = true;
        }


        // draws initial graphs based on default country
        this.drawGraph('cumCasesGlobalLine', this.globeCasesY, [0, 149, 255], 'linear');
        this.drawGraph('cumDeathsGlobalLine', this.globeDeathsY, [255, 61, 113], 'linear');
        this.drawGraph('cumRecoveredGlobalLine', this.globeRecoveredY, [0, 214, 143], 'linear');
        this.drawGraph('cumCasesGlobalLog', this.globeCasesY, [0, 149, 255], 'logarithmic');
        this.drawGraph('cumDeathsGlobalLog', this.globeDeathsY, [255, 61, 113], 'logarithmic');
        this.drawGraph('cumRecoveredGlobalLog', this.globeRecoveredY, [0, 214, 143], 'logarithmic');
        
    }); 

    // gets totals country from Worldometers, data sourced every 10 minutes
    this.dataSource.sort = this.sort;
    var doos = this.dataService.getCountries()
    .subscribe(data => {
        this.dataSource.data = data;
    });

    // gets global totals from Worldometers, data sourced every 10 minutes
    var goos = this.dataService.getGlobal()
    .subscribe(data => this.global = data);


    return { doos, goos};
  }

    // graph template using Chartjs
    drawGraph(id: string, yData: number[], [r, g, b]: number[], type: string): void {
        var ctx = document.getElementById(id);
        var graph  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
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
      }

}
