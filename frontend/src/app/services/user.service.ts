import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint: string = 'http://localhost:3001/api';
  httpClient: any;
  router: any;

  constructor(private http: HttpClient, private route: Router) { }

  //modification password user
  onSubmit(id: any, data: any): Observable<any> {
    console.log(id);

    console.log(data);

   //let API_URL = `${this.endpoint}/updateUser/${id}`;

    return this.http.patch(`${this.endpoint}/update/${id}`, 
    {"actuelPassword": data.actuelPass,
  "newPassword":data.newPass})
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }


}
