import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataViewerComponent } from './pages/data-viewer/data-viewer.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
// import { SimulatorComponent } from './simulator/simulator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
// import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbAutocompleteModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatSortModule } from '@angular/material/sort';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LocalComponent } from './pages/local/local.component';

@NgModule({
  declarations: [
    AppComponent,
    DataViewerComponent,
    SimulationComponent,
    // SimulatorComponent,
    GraphsComponent,
    LocalComponent,
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
    NbAutocompleteModule,
    NbButtonModule,
    NbEvaIconsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
