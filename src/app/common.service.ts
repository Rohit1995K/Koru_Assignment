import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App_Url } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  private _url:string = "/assets/data.json";
  constructor(private http:HttpClient) { }

  getUserList():Observable<any>{
    return this.http.get(this._url);
  }

}
