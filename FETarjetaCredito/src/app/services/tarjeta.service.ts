import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {


  private myAppUrl = 'https://localhost:7133/';
  private myAPiUrl = 'api/tarjeta/';
  constructor(private http: HttpClient) { }


  getListTarjetas(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myAPiUrl);

  }


  deletetarjeta(id: number): Observable<any> {

    return this.http.delete(this.myAppUrl + this.myAPiUrl + id);
  }


  guardarTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myAPiUrl, tarjeta);
  }


  updatetarjeta(id: number, tarjeta: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myAPiUrl + id, tarjeta);
  }
}
