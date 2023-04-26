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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public afficher():void{
    this.show = !this.show;
  }
}
