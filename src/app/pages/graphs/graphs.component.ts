import { Component, OnInit } from '@angular/core';
import { Global, Country, History } from '../data-viewer/model';
import { DataService } from 'src/app/data.service';
import { Chart } from 'chart.js';
import { title } from 'process';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  globeHistory: History;
  globeHistX: Array<string> = [];
  globeCasesY: Array<number> = [];
  globeDeathsY: Array<number> = [];
  globeRecoveredY: Array<number> = [];
  dailyCasesY: Array<number> = [];
  dailyDeathsY: Array<number> = [];
  dailyRecoveredY: Array<number> = [];
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
                // gets cumulative historical data globally from John-Hopkins University, data sourced every 10 minutes
                this.globeHistX.push(d);
                this.globeCasesY.push(data.cases[d] as number);
                this.globeDeathsY.push(data.deaths[d] as number);
                this.globeRecoveredY.push(data.recovered[d] as number);
                // calculates daily data globally based on cumulative data
                this.dailyCasesY.push(data.cases[d] as number - prevHist);
                this.dailyDeathsY.push(data.deaths[d] as number - prevDeaths);
                this.dailyRecoveredY.push(data.recovered[d] as number - prevRecovered);
            }
            prevHist = data.cases[d] as number
            prevDeaths = data.deaths[d] as number
            prevRecovered = data.recovered[d] as number
            this.skip == true ? this.skip = false  : this.skip = true;
        }
        // draws graphs based on global data
        this.drawGraph('cumCasesGlobalLine', this.globeCasesY, [0, 149, 255], 'line', 'linear');
        this.drawGraph('cumDeathsGlobalLine', this.globeDeathsY, [255, 61, 113], 'line', 'linear');
        this.drawGraph('cumRecoveredGlobalLine', this.globeRecoveredY, [0, 214, 143], 'line', 'linear');
        this.drawGraph('dailyCasesGlobalLine', this.dailyCasesY, [0, 149, 255], 'bar', 'linear');
        this.drawGraph('dailyDeathsGlobalLine', this.dailyDeathsY, [255, 61, 113], 'bar', 'linear');
        this.drawGraph('dailyRecoveredGlobalLine', this.dailyRecoveredY, [0, 214, 143], 'bar', 'linear');
        this.drawRecoveredVsDeaths();
        this.drawCasesVsRecovered();
    }); 
  }

    // graph template using Chartjs
    drawGraph(id: string, yData: number[], [r, g, b]: number[], type: string, scaleType: string): void {
        var ctx = document.getElementById(id);
        var graph  = new Chart(ctx, {
            type: type,
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
                        type: scaleType,
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

      // graph template for multiple plots using Chartjs - Recovered vs deaths
      drawRecoveredVsDeaths(): void {
          var ctx = document.getElementById('recoveredVsDeaths');
          var graph  = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: this.globeHistX,
                  datasets: [{
                      label: 'Daily Recoveries',
                      data: this.dailyRecoveredY,
                      borderColor: 'rgba(0, 214, 143, 1)',
                      backgroundColor: 'rgba(0, 214, 143, 0)',
                      borderWidth: 5
                  }, {
                      label: 'Daily Deaths',
                      data: this.dailyDeathsY,
                      borderColor: 'rgba(255, 61, 113, 1)',
                      backgroundColor: 'rgba(255, 61, 113, 0)',
                      borderWidth: 5
                  }]
              },
              options: {
                  legend: {
                      display: true,
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true,
                          }
                      }]
                  }
              }
          });
        }

    // graph template for multiple plots using Chartjs - Cases vs Recovered
    drawCasesVsRecovered(): void {
        var ctx = document.getElementById('casesVsRecovered');
        var graph  = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.globeHistX,
                datasets: [{
                    label: 'Daily Cases',
                    data: this.dailyCasesY,
                    borderColor: 'rgba(0, 149, 255, 1)',
                    backgroundColor: 'rgba(0, 149, 255, 0)',
                    borderWidth: 5,
                }, {
                    label: 'Daily Recoveries',
                    data: this.dailyRecoveredY,
                    borderColor: 'rgba(0, 214, 143, 1)',
                    backgroundColor: 'rgba(0, 214, 143, 0)',
                    borderWidth: 5
                },]
            },
            options: {
                legend: {
                    display: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
      }

}
