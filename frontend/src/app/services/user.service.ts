import { AuthGuard } from './../auth/auth.guard';
import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { User } from '../../../model/user.model';
import { env } from 'src/env';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsersService implements CanActivate {
  private currentUserSubject: BehaviorSubject<User>;
  endpoint: string = 'http://localhost:3001/api';
  http: any;
  constructor(private httpClient:HttpClient, private router: Router, UsersService:UsersService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse((localStorage.getItem('currentUser')!)));
   /*  if (this.currentUserSubject.value == null) {
      this.getLogOut();
      this.router.navigateByUrl('login');
    } */
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
 getConnexion(user:User){
    return this.httpClient.post<User>(`${env.apiUrl}/login`,user).
      pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
       /*  console.log(user.data)  */
        localStorage.setItem('currentUser', JSON.stringify(res.data?.token));
        localStorage.setItem('email', JSON.stringify(res.data?.email));
        localStorage.setItem('id', JSON.stringify(res.data?.userId));

        // localStorage.setItem('prenom', JSON.stringify(res.data?.prenom));
        // localStorage.setItem('nom', JSON.stringify(res.data?.nom));
        this.currentUserSubject.next(res);
        return res;

      }));
 }

    getToken() {
    return localStorage.getItem('currentUser');
  }
  // getPrenom() {
  //   return localStorage.getItem('prenom');
  // }
  // getnom() {
  //   return localStorage.getItem('nom');
  // }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('currentUser');
    return authToken !== null ? true : false;
  }

  getLoggedIn(){

    if(!this.currentUserValue) {
      return false;
    }
    return localStorage.getItem('role');
  }

  getUsers(){
    return this.httpClient.get(`${env.apiUrl}/getAll`)
  };
 
  addUsers(user: User){
    return this.httpClient.post<User>(`${env.apiUrl}/post`,user);
  }


  getLogOut(){
  localStorage.removeItem('currentUser');
  localStorage.removeItem('id');
  localStorage.removeItem('prenom');
  localStorage.removeItem('nom');
  localStorage.removeItem('email');
 // this.router.navigate(['']);
 // if (removeToken == null && removeprenom == null &&  removenom == null && removemail == null) {
    // }
  }



 /*  getRole(){
    return localStorage.getItem('role');
  } */
//Update mdp
modifpass(id: any, data: User): Observable<any> {
  console.log(id);

  console.log(data);

  let API_URL = `${this.endpoint}/updatepass/${id}`;

  return this.httpClient.patch<User>(`${this.endpoint}/updatepass/${id}`,data)
}


doLogout() {
  let removeToken = localStorage.removeItem('access_token');
  if (removeToken == null) {
    this.router.navigate(['/']);
  }
}



}


