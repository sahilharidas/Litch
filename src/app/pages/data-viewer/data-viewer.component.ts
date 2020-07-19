import { Component, OnInit, ViewChild } from '@angular/core';
import { Global, Country, History } from './model';
import { DataService } from 'src/app/data.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Chart } from 'chart.js';
import { time } from 'console';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.scss']
})
export class DataViewerComponent implements OnInit {
    
  globeHistory: History;
  globeHistX: Array<string> = [];
  globeHistY: Array<number> = [];
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

    this.dataService.getGlobalHistory()
    .subscribe(data => {
        this.skip = false;
        for (let d in data.cases) {
            if (!this.skip) {
                this.globeHistX.push(d);
                this.globeHistY.push(data.cases[d] as number);
                this.globeDeathsY.push(data.deaths[d] as number);
                this.globeRecoveredY.push(data.recovered[d] as number);
            }
            this.skip == true ? this.skip = false  : this.skip = true;
        }
        
        var ctx = document.getElementById('dailyCasesGlobalLine');
        var dailyCasesGlobal  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.globeHistY,
                    backgroundColor: 
                        'rgba(0, 149, 255, 0.2)',
                    borderColor:
                        'rgba(0, 149, 255, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                   display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });   
        
        var ctx = document.getElementById('dailyCasesGlobalLog');
        var dailyCasesGlobal  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.globeHistY,
                    backgroundColor: 
                        'rgba(0, 149, 255, 0.2)',
                    borderColor:
                        'rgba(0, 149, 255, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                   display: false
                },
                scales: {
                    yAxes: [{
                        type: 'logarithmic',
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
        
        var ctx = document.getElementById('dailyDeathsGlobalLine');
        var dailyDeathsGlobalLine  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.globeDeathsY,
                    backgroundColor: 
                        'rgba(255, 61, 113, 0.2)',
                    borderColor:
                        'rgba(255, 61, 113, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                   display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });   
        
        var ctx = document.getElementById('dailyDeathsGlobalLog');
        var dailyDeathsGlobalLog  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.globeDeathsY,
                    backgroundColor: 
                        'rgba(255, 61, 113, 0.2)',
                    borderColor:
                        'rgba(255, 61, 113, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                   display: false
                },
                scales: {
                    yAxes: [{
                        type: 'logarithmic',
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
        
        var ctx = document.getElementById('dailyRecoveredGlobalLine');
        var dailyRecoveredGlobalLine  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.globeRecoveredY,
                    backgroundColor: 
                        'rgba(0, 214, 143, 0.2)',
                    borderColor:
                        'rgba(0, 214, 143, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                   display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });   
        
        var ctx = document.getElementById('dailyRecoveredGlobalLog');
        var dailyRecoveredGlobalLog  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.globeRecoveredY,
                    backgroundColor: 
                        'rgba(0, 214, 143, 0.2)',
                    borderColor:
                        'rgba(0, 214, 143, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                legend: {
                   display: false
                },
                scales: {
                    yAxes: [{
                        type: 'logarithmic',
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
    }); 


    
    this.dataSource.sort = this.sort;
    var doos = this.dataService.getCountries()
    .subscribe(data => {
        this.dataSource.data = data;
    });

    var goos = this.dataService.getGlobal()
    .subscribe(data => this.global = data);


    return { doos, goos};
  }

}
