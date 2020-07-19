import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataViewerComponent } from './pages/data-viewer/data-viewer.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { GraphsComponent } from './pages/graphs/graphs.component';


const routes: Routes = [
  { path: '', component: DataViewerComponent},
  { path: 'graphs', component: GraphsComponent},
  { path: 'simulation', component: SimulationComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
