import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }
  

  getCommodity(){
    return JSON.parse(window.sessionStorage.getItem('commodity'));
  }

  setCommodity(commodity){
    window.sessionStorage.setItem('commodity',JSON.stringify(commodity));
  }

  getUser(){
    return JSON.parse(window.sessionStorage.getItem('user'));
  }

  setUser(user){
    window.sessionStorage.setItem('user',JSON.stringify(user));
  }

  clear(key){
    window.sessionStorage.removeItem(key);
  }

}
