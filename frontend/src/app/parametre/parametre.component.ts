import { Component, OnInit } from '@angular/core';
import { RemplissageService } from '../services/remplissage.service';
@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
  showMessageA: boolean = false;
  showMessageB: boolean = false;
  route: any;
  afficherMessageA() {
    this.showMessageA = true;
    setTimeout(() => {
      this.showMessageA = false;
    }, 3000); // Disparaître après 5 secondes
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
