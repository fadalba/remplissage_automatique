import { Component, OnInit } from '@angular/core';
import { RemplissageService } from '../services/remplissage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
  showMessageA: boolean = false;
  showMessageB: boolean = false;
  route: any;

  /* ********************Fonction pour lire un message vocal******************** */
lireMessageVocal(message: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  synth.speak(utterance);
}
/* ********************fin Fonction pour lire un message vocal******************** */

  afficherMessageA(message: string) {
      console.log(message);
      this.lireMessageVocal("Option 1 (100ml)activée avec succès"); // syntèse vocal
  // Afficher une fenêtre contextuelle avec le message "activé avec succès"
  Swal.fire({
    icon: 'success',
    title: 'Option 1 (100ml) activé avec succès!',
    text: message,
    timer: 2000,
    timerProgressBar: true,
  });
    
  }

  afficherMessageB(message: string) {
    console.log(message);
    this.lireMessageVocal("Option 2 (200ml) activée avec succès");
// Afficher une fenêtre contextuelle avec le message "activé avec succès"
Swal.fire({
  icon: 'success',
  title: 'Option 2 (200ml) activé avec succès!',
  text: message,
  timer: 2000,
  timerProgressBar: true,
});
  
}
 
  constructor( private remplissageService:RemplissageService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  option1(){
    this.remplissageService.option1()
  }
  option2(){
    this.remplissageService.option2()
  }
}
