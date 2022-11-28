import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly APIUrl="http://localhost:5005/api";

  constructor(private http:HttpClient) { }
  getUser():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/User');
  }
}

