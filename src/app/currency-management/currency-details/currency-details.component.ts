import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';



@Component({
  selector: 'currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  
  @Input() formGroupName! : string; 

  form!:FormGroup;


  constructor(private rootParentGroup:FormGroupDirective) {}
  
  ngOnInit(): void {
    this.form=this.rootParentGroup.control.get(this.formGroupName) as FormGroup;
    this.form.controls["cryptoId"].disable();
    this.form.controls["cryptoName"].setValidators(Validators.required);
    //this.form.controls["cryptoName"].updateValueAndValidity();
    this.form.controls["cryptoValue"].setValidators(Validators.required);
    //this.form.controls["cryptoValue"].updateValueAndValidity();
    
  }


 

  
  
}
