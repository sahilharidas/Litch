import { Component, OnInit, ViewChild } from '@angular/core';
import { Global, Country } from './model';
import { Day } from './model';
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
    
  days: Day[];
  global: Global;
  countries: Country[];
  displayedColumns: string[] = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths',
                            'recovered', 'todayRecovered', 'tests', 'active', 'critical',
                            'casesPerOneMillion', 'deathsPerOneMillion', 'testsPerOneMillion'];
  dataSource = new MatTableDataSource<Country>(this.countries);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DataService) { }
  

  ngOnInit() {

    // var ctx = document.getElementById('myChart');
    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             // label: '# of Votes',
    //             data: [1, 2, 3, 2, 2, 3],
    //             backgroundColor: 
    //                 'rgba(255, 159, 64, 0.2)',
    //             borderColor: 
    //                 'rgba(255, 159, 64, 1)',
    //             borderWidth: 1
    //         }]
    //     }
    // });
    
    var coos = this.dataService.getDays()
    .subscribe(data => this.days = data);
    
    this.dataSource.sort = this.sort;
    var doos = this.dataService.getCountries()
    .subscribe(data => {
        this.dataSource.data = data;
    });

    var goos = this.dataService.getGlobal()
    .subscribe(data => this.global = data);


    return { coos, doos, goos};
  }

}
