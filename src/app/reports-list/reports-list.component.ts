import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports: any;
  query: string = ""
  nameSort: any;
  locationSort:any;
  timeSort:any;

  constructor(private rs: ReportsService, private router:Router, private http:HttpClient) {
    this.reports = [];
    this.nameSort = 1;
    this.locationSort = 1;
    this.timeSort = 1;
  }

  onReportDelete(evt){
    const del_report = evt["key"]
    this.reports = this.rs.delete(del_report)
  }

  onReportChangeStatus(evt) {
    this.reports = this.rs.changeStatus(evt["key"]);
  }

  onReportMoreInfo(evt) {
    this.reports = this.rs.moreInfo(evt["key"]);
  }

  ngOnInit(): void {
    this.reports = this.rs.get();
  }

  sortByTimereported() {
    if (this.timeSort == 1) {
      var sortedTemp = this.reports.sort(
        (r1, r2) => (r1.timeReported > r2.timeReported) ? 1 : (r1.timeReported < r2.timeReported) ? -1 : 0
      );
      this.timeSort = 0;
    } else {
      var sortedTemp = this.reports.sort(
        (r1, r2) => (r1.timeReported > r2.timeReported) ? -1 : (r1.timeReported < r2.timeReported) ? 1 : 0
      );
      this.timeSort = 1;
    }
    
    return sortedTemp;
  }

  sortByReportedby() {
    if(this.nameSort == 1) {
      var sortedTemp = this.reports.sort(
        (r1, r2) => (r1.reporterName > r2.reporterName) ? 1 : (r1.reporterName < r2.reporterName) ? -1 : 0
      );
      this.nameSort = 0;
    } else {
      var sortedTemp = this.reports.sort(
        (r1, r2) => (r1.reporterName > r2.reporterName) ? -1 : (r1.reporterName < r2.reporterName) ? 1 : 0
      );
      this.nameSort = 1;
    }
    return sortedTemp;

  }

  sortByLocation() {
    if (this.locationSort == 1) {
      var sortedTemp = this.reports.sort(
        (r1, r2) => (r1.locationName > r2.locationName) ? 1 : (r1.locationName < r2.locationName) ? -1 : 0
      );
      this.locationSort = 0;
    } else {
      var sortedTemp = this.reports.sort(
        (r1, r2) => (r1.locationName > r2.locationName) ? -1 : (r1.locationName < r2.locationName) ? 1 : 0
      );
      this.locationSort = 1;
    }
    
    return sortedTemp;
  }

}