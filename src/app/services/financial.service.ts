import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Currency } from '../model/currency.model';

@Injectable()
export class FinancialService {
  
  private api:string = "/api/financial";

  constructor(private http: HttpClient) { }

  fetchCurrencies():Observable<Currency[]>{
    let url = this.api + '/currencies';
    return this.http.get<Currency[]>(url);
  }

  saveCurrency(newCurrency:Currency):Observable<Currency>{
    let url = this.api + '/currencies';
    return this.http.post<Currency>(url,newCurrency).pipe(
      catchError(e => {
        console.error('problema',e)
        return throwError(() => new Error('Something wrong happened - details: ' + e.error));
      })
    );
  }

  deleteCurrency(id:number):Observable<any>{
    let url = this.api + `/currencies/${id}`;
    return this.http.delete(url).pipe(
      catchError(e => {
        console.error('problema',e)
        return throwError(() => new Error('Something wrong happened - details: ' + e.error));
      })
    );
  }

  updateCurrency(id: number, currecyEdited:Currency):Observable<any>{
    let url = this.api + `/currencies/${id}`;
    return this.http.put(url, currecyEdited).pipe(
      catchError(e => {
        console.error('problema',e)
        return throwError(() => new Error('Something wrong happened - details: ' + e.error));
      })
    );
  }
}
