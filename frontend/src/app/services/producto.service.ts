import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({providedIn: 'root'})
export class ProductoService {

  apiUrl:string  = 'http://localhost:3000/api/productos'

  constructor(private http:HttpClient) { }


  getProductos():Observable<any>{
    return this.http.get(this.apiUrl)
  }

  getProductoById(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/ ${id}`)
  }

  postProducto(producto:any):Observable<any>{
    return this.http.post(this.apiUrl, producto)
  }

  putProducto(id: number, producto:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto)
  }

  deleteProducto(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
