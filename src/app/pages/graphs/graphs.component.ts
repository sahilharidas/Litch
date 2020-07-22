import { Component, OnInit } from '@angular/core';
import { Global, Country, History } from '../data-viewer/model';
import { DataService } from 'src/app/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  globeHistory: History;
  globeHistX: Array<string> = [];
  globeHistY: Array<number> = [];
  globeDeathsY: Array<number> = [];
  globeRecoveredY: Array<number> = [];
  cumHistY: Array<number> = [];
  cumDeathsY: Array<number> = [];
  cumRecoveredY: Array<number> = [];
  skip: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getGlobalHistory()
    .subscribe(data => {
        this.skip = false;
        var prevHist = 0;
        var prevDeaths = 0;
        var prevRecovered = 0;
        for (let d in data.cases) {
            if (!this.skip) {
                this.globeHistX.push(d);
                this.globeHistY.push(data.cases[d] as number);
                this.globeDeathsY.push(data.deaths[d] as number);
                this.globeRecoveredY.push(data.recovered[d] as number);

                this.cumHistY.push(data.cases[d] as number - prevHist);
                this.cumDeathsY.push(data.deaths[d] as number - prevDeaths);
                this.cumRecoveredY.push(data.recovered[d] as number - prevRecovered);
            }
            prevHist = data.cases[d] as number
            prevDeaths = data.deaths[d] as number
            prevRecovered = data.recovered[d] as number
            this.skip == true ? this.skip = false  : this.skip = true;
        }
        
        var ctx = document.getElementById('cumCasesGlobalLine');
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
        
      
        
        var ctx = document.getElementById('cumDeathsGlobalLine');
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
        
        var ctx = document.getElementById('cumRecoveredGlobalLine');
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
        
        var ctx = document.getElementById('dailyCasesGlobalLine');
        var dailyCasesGlobal  = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.cumHistY,
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
        
      
        
        var ctx = document.getElementById('dailyDeathsGlobalLine');
        var dailyDeathsGlobalLine  = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.cumDeathsY,
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
        
        var ctx = document.getElementById('dailyRecoveredGlobalLine');
        var dailyRecoveredGlobalLine  = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    data: this.cumRecoveredY,
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
        
    }); 

    this.graphCountries();
  }

  graphCountries(): void {

  }

}
