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
compteurEnCours!:any;
valeurTapis!:any;
valeurRemplissage!:any
valeurBouchonnage!:any
i!:any
constructor(private RemplissageService:RemplissageService){}
afficherMessageA() {
  this.showMessage === false? this.showMessage = true:this.showMessage = false;

}
ngOnInit(): void {
    // this.RemplissageService.compteurEnCours().subscribe((data:any) =>{
    //  // console.log(this.compteurEnCours);
    //   this.compteurEnCours = data;
      this.RemplissageService.valeurTapis().subscribe((data:any)=>{
        this.valeurTapis = data;
        console.log(this.valeurTapis);

        this.RemplissageService.valeurRemplissage().subscribe((data:any)=>{
      this.valeurRemplissage = data;
      console.log(this.valeurRemplissage);

      this.RemplissageService.valeurBouchonnage().subscribe((data:any)=>{
          this.valeurBouchonnage = data;
          console.log(this.valeurBouchonnage);
      this.RemplissageService.compteurs().subscribe((data:any)=>{
      this.i = data;
      console.log(this.i);

    })
        })
})
      })
  // });

}
Initsysteme(){
  this.RemplissageService.Initsysteme()
  // this.img1 === false? this.img1 = true:this.img1 = false;

}
Remiseazero(){
  this.RemplissageService.remiseazero()
  // this.img1 === false? this.img1 = true:this.img1 = false;

}
option1(){
  this.RemplissageService.option1()
}
// systemeOn(){
//   }
  // systemeOff(){
  //   this.img1 = true;
  //   }
}
