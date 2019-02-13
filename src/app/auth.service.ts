import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  createUser(id: string,firstName: string,lastName: string,password: string){
    return this.httpClient.post("/api/User",{
      "$class": "org.farm.network.User",
      "userId": id,
      "firstName": firstName,
      "lastName": lastName,
      "password": password,
      "balance" : 1000
    });
  }

  loginUser(id : string){
    return this.httpClient.get("/api/User/"+id);
  }

}
