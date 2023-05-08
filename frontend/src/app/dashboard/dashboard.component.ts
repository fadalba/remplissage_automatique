import { Component, OnInit } from '@angular/core';
import { RemplissageService } from '../services/remplissage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
[x: string]: any;
img1:boolean=true;
img2:boolean=true;
showMessage: boolean = false;
constructor(private RemplissageService:RemplissageService){}
afficherMessageA() {
  this.showMessage === false? this.showMessage = true:this.showMessage = false;

}
ngOnInit(): void {

}
Initsysteme(){
  this.RemplissageService.Initsysteme()
}
Remiseazero(){
  this.RemplissageService.remiseazero()
}
systemeOn(){
  this.img1 === false? this.img1 = true:this.img1 = false;
  }
  systemeOff(){
    this.img1 = true;
    }
}
