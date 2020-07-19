import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataViewerComponent } from './pages/data-viewer/data-viewer.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
// import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatSortModule } from '@angular/material/sort';
import { GraphsComponent } from './pages/graphs/graphs.component';

@NgModule({
  declarations: [
    AppComponent,
    DataViewerComponent,
    SimulationComponent,
    SimulatorComponent,
    GraphsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
