import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListById } from './model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // public List: { id: number; name: string; dob: string;phoneNumber:string;email:string;gt:number } = {
  //   id: 0,
  //   name: "",
  //   dob:"",
  //   phoneNumber: "",
  //   email:"",
  //   gt:0
  // };
  readonly APIUrl = 'http://localhost:5005/api';

  constructor(private http: HttpClient) { }
  getUser(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/User');
  };
  getById(id: number): Observable<ListById> {
    return this.http.get<ListById>(`${this.APIUrl}/User/id?id=${id}`).pipe()
  }
  postUser(obj:any){
    return this.http.post(this.APIUrl+'/User',obj);
  }
  putUser(obj:any){
    return this.http.put(this.APIUrl+'/User',obj);
  }
  deleteUser(id:any){
    return this.http.delete(`${this.APIUrl}/User?id=${id}`);
  }
}

