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
  // Appel la fonction "speak" pour lire le message à haute voix au chargement du composant
  this.speak();

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

/* ************************************fonction lire en haut parleur ****************************/
    toggleMessage() {
      this.showMessage = !this.showMessage;
      // Appel la fonction "speak" pour lire le message à haute voix lors du changement d'état du système
      this.speak();
    }

    speak() {
      const message = this.showMessage ? 'Démarrage Systeme ' : 'Arrêt systeme';
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      synth.speak(utterance);
      // Pause de 1 seconde pour laisser le temps à la synthèse vocale de s'initialiser
      setTimeout(() => {
        synth.speak(utterance);
      }, 1000);
    }
    /* ************************************fin  fonction lire en haut parleur ********************/
}
