import { RemplissageService } from './../services/remplissage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  show:boolean=false;
  searchText!: string;
itemsperpage: number =5;
p: number = 1;
total1: number = 0; // pour bouteille 100ml
total2: number = 0; // pour bouteille  200ml

constructor(private service: RemplissageService) {}
  ngOnInit(): void {
    this.service.getTotal1().subscribe((data: any) => {
      this.total1 = data.total1;
    });
    this.service.getTotal2().subscribe((data:any) =>{
      this.total2= data.total2;
    }
    );

    throw new Error('Method not implemented.');
  }
  public afficher():void{
    this.show = !this.show;
  }


}
