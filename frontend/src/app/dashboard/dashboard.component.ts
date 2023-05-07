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
  this.showMessage === false? this.showMessage = true:this.showMessage = false;

}
ngOnInit(): void {
  // Appel la fonction "speak" pour lire le message à haute voix au chargement du composant
  this.speak();

}
systemeOn(){
  this.img1 === false? this.img1 = true:this.img1 = false;
  }
  systemeOff(){
    this.img1 = true;
    }


    toggleMessage() {
      this.showMessage = !this.showMessage;
      // Appel la fonction "speak" pour lire le message à haute voix lors du changement d'état du système
      this.speak();
    }

    speak() {
      const message = this.showMessage ? 'Système ON ' : 'Système OFF';
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      synth.speak(utterance);
    }
}
