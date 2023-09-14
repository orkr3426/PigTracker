import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { ReportsService } from '../reports.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})
export class ReportAddFormComponent implements OnInit {
  form: FormGroup
  locations = this.rs.getExistingLocations();

  constructor(private rs: ReportsService, private router: Router)  { 
    let formControls = {
      reporterName: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        this.forbiddenNamesValidator
      ]),
      phone: new FormControl('', [
        Validators.required,
        this.emptyValidator
      ]),
      breed: new FormControl('', [
        Validators.required,
        this.emptyValidator
      ]),
      pid: new FormControl('', [
        Validators.required,
        this.emptyValidator
      ]),
      locationName: new FormControl('',[
        Validators.required,
        this.emptyValidator
      ]),
      latitude: new FormControl('', [
        Validators.required,
        this.emptyValidator
      ]),
      longitude: new FormControl('', [
        Validators.required,
        this.emptyValidator
      ]),
      extraNote: new FormControl(''),
      status: new FormControl(false),
      moreInfoSwitch: new FormControl(false),
      timeReported: new FormControl((new Date().getTime()))
    }

    this.form = new FormGroup(formControls);
    
  }

  forbiddenNamesValidator(control: FormControl){
    var bad_words = ['stupid', 'freaking', 'hell', 'idiot']
    if (bad_words.includes(control.value.trim())){
      return { name_error: "Your name cannot be " + control.value } // invalid
    }
    else {
      return null // pass
    }
  }

  emptyValidator(control:FormControl) {
    if (control.value == null) {
      return { Empty: "Input should not be left empty" }
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.locations = this.rs.getExistingLocations();
    console.log(this.locations);
  }

  onSubmit(values){
    this.rs.add(values);
    
    // navigation back to root
    if(!confirm("New Report is now posted!\nWould you like to create a new report?")){
      this.router.navigate(["/"]);
    } else {
      location.reload();
    }
  }


}



