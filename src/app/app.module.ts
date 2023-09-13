import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyManagementComponent } from './currency-management/currency-management.component';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyDetailsComponent } from './currency-management/currency-details/currency-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { MessageService } from 'primeng/api';
import { FinancialService } from './services/financial.service';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyManagementComponent,
    CurrencyDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    HttpClientModule,
    ToastModule
    
  
  ],
  providers: [MessageService, FinancialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
