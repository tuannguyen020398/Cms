import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filter, ListById } from './model';

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
  readonly APIUrl = 'http://10.1.11.115:5001/api';

  constructor(private http: HttpClient) { }
  getUser(): Observable<any[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(this.APIUrl + '/User', { headers: headers });
  };
  getById(id: number): Observable<ListById> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<ListById>(`${this.APIUrl}/User/id?id=${id}`, { headers: headers }).pipe();
  }
  postUser(obj: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(this.APIUrl + '/User', obj, { headers: headers });
  }
  putUser(obj: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.put(this.APIUrl + '/User', obj, { headers: headers });
  }
  deleteUser(id: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete(`${this.APIUrl}/User?id=${id}`, { headers:headers });
  }
  authencateUser(obj: any) {
    return this.http.post(this.APIUrl + '/User/authenticate', obj);
  }
  // getKeyWorkPading(obj:Filter){
  //   return this.http.get(`${this.APIUrl}/User/keywork?Keywork=${obj.Keywork}&Count=${obj.Count}&StartDob=${obj.StartDob}&EndDob=${obj.EndDob}`).pipe();
  // }
  getKeyWorkPading(obj: Filter) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(this.APIUrl + '/User/keywork', obj, { headers: headers });
  }
}

