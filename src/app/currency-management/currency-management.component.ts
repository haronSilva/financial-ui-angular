import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Currency } from '../model/currency.model';
import { FinancialService } from '../services/financial.service';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';

@Component({
  selector: 'currency-management',
  templateUrl: './currency-management.component.html',
  styleUrls: ['./currency-management.component.css']
})
export class CurrencyManagementComponent implements OnInit {
          
  @ViewChild(CurrencyDetailsComponent)
  cryptoDetails!: CurrencyDetailsComponent;
  display:boolean=false;



  cryptocurrencies: Currency[] = [];
  cryptoSelected = {} as Currency;
  userForm!: FormGroup;
  indexForDeletion!:number;
  idForDeletion!:number;
  
  constructor(private fb:FormBuilder, private financialService:FinancialService, private messageService: MessageService){}

  ngOnInit(): void {

      this.userForm = this.fb.group({
        cryptoForm: this.fb.group({
          cryptoId:[],
          cryptoName:[],
          cryptoValue:[]
        })});

      this.loadCurrencies();
      
  }
  

  onEdit(id: number){
    console.log(id);
    let obj = this.cryptocurrencies.find(c => c.id == id);
    if(obj != null){
      this.userForm.get("cryptoForm")?.setValue({
        "cryptoId":obj.id,
         "cryptoName":obj.name,
         "cryptoValue":obj.value 
      });

      this.display=true;
    }

    
  }

  onDelete(id: number){
    console.log(id);
    let index = this.cryptocurrencies.findIndex(c => c.id==id)
    

    this.indexForDeletion = index;
    this.idForDeletion=id;
    this.messageService.add({key:"confirmationMessage", sticky:true,  severity:'warn', summary:'Currency', detail:'Do you confirm your decision ?'})
    
  }

  showDialog(){
    this.userForm.get("cryptoForm")?.reset();
    this.display=true;
  }

  save(){
    console.log(this.userForm.get("cryptoForm"))
    let formGroup = this.userForm.get("cryptoForm") as FormGroup; 
    let cryptoId = formGroup.controls["cryptoId"].value;
    let obj = this.cryptocurrencies.find(c => c.id == cryptoId);
    if(obj !=null){
      obj.name = this.userForm.get("cryptoForm")?.value.cryptoName;
      obj.value= this.userForm.get("cryptoForm")?.value.cryptoValue;
      this.financialService.updateCurrency(cryptoId, obj).subscribe({
        next: (resp) => {
            this.display=false;
            this.messageService.add({key:"normalMessage", severity:'success', summary:'Currency', detail:'Currency saved successfully'})
        },
        error : (error) => this.messageService.add({key:"normalMessage", severity:'error', summary:'Currency', detail:error})
      });

    } else {
      let newCrypto = {
        "name": this.userForm.get("cryptoForm")?.value.cryptoName,
        "value": this.userForm.get("cryptoForm")?.value.cryptoValue
      } as Currency;

      this.financialService.saveCurrency(newCrypto).subscribe({
        next: resp =>{
          this.cryptocurrencies.push(resp);
          this.display=false;
          this.messageService.add({key:"normalMessage", severity:'success', summary:'Currency', detail:'New currency saved succesfully'});
        },
        
        error: (error) => this.messageService.add({key:"normalMessage", severity:'error', summary:'Currency', detail:error})  
      });
    }
    
  }

  onReject() {
    this.messageService.clear("confirmationMessage");
  }

  onConfirm(){
    this.financialService.deleteCurrency(this.idForDeletion).subscribe( {
      next: resp => {
        this.cryptocurrencies.splice(this.indexForDeletion,1);
        this.messageService.clear("confirmationMessage");
        this.messageService.add({key:"normalMessage", severity:'success', summary:'Currency', detail:'Currency deleted succesfully'});     
      },
      
      error: (error) => this.messageService.add({key:"normalMessage", severity:'error', summary:'Currency', detail:error})
    })
  }

  loadCurrencies(){
    this.financialService.fetchCurrencies().subscribe(resp => {
      this.cryptocurrencies = resp;
    });
  }
}
