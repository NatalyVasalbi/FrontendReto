import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl='https://localhost:44328/';
  private myAppiURL='api/Product/';
  constructor(private http: HttpClient) { }

  getListProducts(): Observable<any>{
    return this.http.get(this.myAppUrl+this.myAppiURL+"GetAll");
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl+this.myAppiURL+"Delete/"+id);
  }
  addProduct(product: any): Observable<any>{
    return this.http.post(this.myAppUrl+this.myAppiURL+"Create", product);
  }
  updateProduct(product: any): Observable<any>{
    return this.http.put(this.myAppUrl+this.myAppiURL+"Update", product);
  }
}
