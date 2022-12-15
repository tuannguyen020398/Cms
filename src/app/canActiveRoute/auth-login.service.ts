import { Injectable } from '@angular/core';
import {Router,CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthloginService implements CanActivate {

  constructor(private route:Router) { }
  canActivate(): boolean {
    if (localStorage.getItem('token')!==null) {
      this.route.navigate(['main']);
      return false;
    }
    return true;
  }
}
