import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './reports-list/reports-list.component';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { RoutingModule } from './routing.module';
import { MapScreenComponent } from './map-screen/map-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    ReportListComponent,
    ReportAddFormComponent,
    MapScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
