import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { ReportListComponent } from './reports-list/reports-list.component';

const appRoutes:Routes = [
  { path: '', component: ReportListComponent },
  { path: 'add', component: ReportAddFormComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
