import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  reports: any;
  locations: any;
  allLocations: any;
  latitudes: any;
  longitudes: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.reports = [];
    this.locations = [];
    this.allLocations = [];
    this.latitudes = [];
    this.longitudes = [];
  }

  get(){
    this.http.get<Object>("https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/")
      .subscribe((data:any)=>{
        console.log(data)
        var i = 0;
        for(i=0; i<data.length; i++) {
          this.reports.push(data[i].data);
        }
        console.log("Report Service get()", this.reports);
      });

      return this.reports;
  }

  add(report){
    this.http.post("https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/", {"key":report.pid, "data":report}).subscribe((data:any)=>{
      console.log(data)
    });
  }

  changeStatus(change_report:number) {
    var curStatus = this.reports.find((p=>p.pid==change_report)).status;

    if (curStatus==false) {
      this.reports.find((p=>p.pid==change_report)).status = true;
    } else {
      this.reports.find((p=>p.pid==change_report)).status = false;
    }
    var curUrl = "https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/"+change_report+"/";
    var curReport = this.reports.find((p=>p.pid==change_report));

    this.http.put(curUrl,{"key":change_report, "data":curReport}).subscribe((data:any)=>{
      console.log(data)
    });
    return this.reports;
  }

  delete(del_report:number){
    var curReport = this.reports.find(p=>p.pid==del_report);
    this.reports = this.reports.filter(p=>p.pid!==del_report);
    var curUrl = "https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/"+del_report+"/";
    this.http.delete(curUrl).subscribe((data:any)=>{
      console.log(data)
    });
    return this.reports
  }

  moreInfo(report) {
    var curSwitch = this.reports.find((p=>p.pid==report)).moreInfoSwitch;
    if (curSwitch==false) {
      this.reports.find((p=>p.pid==report)).moreInfoSwitch = true;
    } else {
      this.reports.find((p=>p.pid==report)).moreInfoSwitch = false;
    }
    var curUrl = "https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/"+report+"/";
    var curReport = this.reports.find((p=>p.pid==report));
    this.http.put(curUrl,{"key":report, "data":curReport}).subscribe((data:any)=>{
      console.log(data)
    });
    return this.reports;
  }

  getExistingLocations() {
    this.http.get<Object>("https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/")
      .subscribe((data:any)=>{
        var i = 0;
        for(i=0; i<data.length; i++ ) {
          if(this.locations.indexOf(data[i].data.locationName)==-1) {
            this.locations.push(data[i].data.locationName);
          }
        }
      });
    return this.locations;
  }

  getAllLocations() {
    this.http.get<Object>("https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/")
      .subscribe((data:any)=>{
        var i = 0;
        for(i=0; i<data.length; i++ ) {
          this.allLocations.push(data[i].data.locationName);
        }
      });
    return this.allLocations;
  }
}


