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
ngOnInit(): void {

}
systemeOn(){
  this.img1 = false;
  }
  systemeOff(){
    this.img1 = true;
    }
}
<<<<<<< HEAD
=======

>>>>>>> 4a37d2c40e6b0784c461093413a2d9c58c6e4e01
