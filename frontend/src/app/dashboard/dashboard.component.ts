import { Component, OnInit } from '@angular/core';

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
afficherMessageA() {
  this.showMessage = true;
  setTimeout(() => {
    this.showMessage = false;
  }, 2000); // Disparaître après 5 secondes
}
ngOnInit(): void {

}
systemeOn(){
  this.img1 === false? this.img1 = true:this.img1 = false;
  }
  systemeOff(){
    this.img1 = true;
    }
}
