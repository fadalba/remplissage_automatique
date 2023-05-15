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
i!:any // compteur du nombre de bouteille


constructor(private RemplissageService:RemplissageService){}
/* ********************Fonction pour lire un message vocal******************** */
lireMessageVocal(message: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  synth.speak(utterance);
}
/* ********************fin Fonction pour lire un message vocal******************** */
afficherMessageA() {
this.showMessage = true;
  this.i >= 1;
this.lireMessageVocal("Le système est allumé."); // syntèse vocal
}
afficheMessageB(){
  this.showMessage = false;
  this.i <=0;
  this.lireMessageVocal("Le système est arrêté."); // syntèse vocal
}
ngOnInit(): void {

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

}
Initsysteme(){
  this.RemplissageService.Initsysteme()


}
Remiseazero(){
  this.RemplissageService.remiseazero()


}
option1(){
  this.RemplissageService.option1()
}

systemeOn(){
  this.img1 === false? this.img1 = true:this.img1 = false;

  }
  systemeOff(){
    this.img1 = true;

    }


}
