import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @Input() report
  @Output() delete = new EventEmitter()
  @Output() change = new EventEmitter()
  @Output() moreInfo = new EventEmitter()

  constructor(private router: Router) { }

  onDelete(evt:any,key:string){
    var pw = prompt("Please enter the passcode to continue: ");
    if (pw == "OINK!!") {
      evt["key"] = key;
      this.delete.emit(evt)
    } else {
      alert("Wrong Passcode");
      this.router.navigate([""]);
    }
  }

  onChangeStatus(evt:any, key:string) {
    var pw = prompt("Please enter the passcode to continue: ");
    if (pw == "OINK!!") {
      evt["key"] = key;
      this.change.emit(evt);
    } else {
      alert("Wrong Passcode");
      this.router.navigate([""]);
    }
  }

  onMoreInfo(evt:any, key:string){
    evt["key"] = key;
    this.moreInfo.emit(evt);
  }

  ngOnInit(): void {
  }

}
