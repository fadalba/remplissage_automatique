import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RemplissageService {
  gethisto() {
    throw new Error('Method not implemented.');
  }
  filter(arg0: (e: any) => boolean): number {
    throw new Error('Method not implemented.');
  }
  rempli: any;
  private url = 'http://localhost:3001/api/getAllc';
  data: any[] = [];
  httpClient: any;

  constructor(private socket: Socket, private http: HttpClient, private route: Router) {}

  getData() {
    return this.http.get(this.url);
  }

  Initsysteme(){
    this.socket.emit('Init' , '1')
  }
  remiseazero(){
    this.socket.emit('remiseazero', '2')
  }
  option1() {
    this.socket.emit('option1', '3')
  }
  option2() {
    this.socket.emit('option2', '4')
  }
  remplirOn(){
    this.socket.emit('systeme', '6')
  }
  remplirOff(){
    this.socket.emit('systeme', '7')
  }
  bouchonON() {
    this.socket.emit('systeme', '8' )
  }
  bouchonOff() {
    this.socket.emit('systeme', '9' )
  }
  rebotOn() {
    this.socket.emit('systeme', '10' )
  }
  rebotOff() {
    this.socket.emit('systeme', '11' )
  }
  compteurEnCours(){
    return this.socket.fromEvent('compteurEnCours')
  }
  valeurTapis(){
    return this.socket.fromEvent('valeurTapis')
  }
  valeurRemplissage(){
    return this.socket.fromEvent('valeurRemplissage')
  }
  valeurBouchonnage(){
    return this.socket.fromEvent('valeurBouchonnage')
  }
compteurs(){
  return this.socket.fromEvent('i')
}

   remplir(){
    return new Observable( observer => {
      this.socket.on('connecte',(data:any) => {
       observer.next(data);
          })
     })

  }

  login(user: any) {
    return this.http.post('http://localhost:3001/auth/login', user);
  }

  getUser() {

    return this.http.get('http://localhost:3001/auth/profile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      }
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }


  updatePassword(email: any, data: any): Observable<any> {

const donnee = { "newPassword": data.newPass, "password": data.actuelPass }

    return this.http.patch(`http://localhost:3001/user/${email}`,  donnee , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

  }


getTotal1() {
  return this.http.get<any[]>(this.url);

}

getTotal2() {
  return this.http.get<any[]>(this.url);
}



}



