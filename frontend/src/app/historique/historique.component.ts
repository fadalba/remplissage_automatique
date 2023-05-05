import { Compteur } from './../../../model/compteur';
import { RemplissageService } from './../services/remplissage.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
filterTerm!:string;
  show:boolean=false;
public hist:any=[];
itemsperpage: number =5;
p: number = 1; // pagination index
 filtre:  any[] = [];
restaure!:any;  // ecraser les données de la recherche
total1: number = 0; // pour bouteille 100ml
total2: number = 0; // pour bouteille  200ml
/* totalG1: number = 0; */
totalLenght: string|number|undefined;
tj1?: any[]; // total journée 1
data: any;



constructor(private http: HttpClient, private service: RemplissageService) {}

getCompteurData(): Observable<any> {
  return this.http.get<any>('/api/compteur');
}

  ngOnInit(): void {


       this.service.getData().subscribe((res: any) => {
      this.data = res;
    });

    this.service.getTotal1().subscribe((data: any) => {
      this.total1 = data.total1;

    });

    this.service.getTotal2().subscribe((data:any) =>{
      this.total2= data.total2;

    }
    );


    this.service.getTotal2().subscribe((data:any) => {
      // console.log(data);
       this.filtre=data as unknown as Compteur[]
       this.restaure=data as unknown as Compteur[]
      // console.log(this.filtre);
        })
/*
        this.service.getTotalG1().subscribe(
          (resultats) => {
            this.tj1 = resultats;
          },
          (error) => {
            console.error(error);
          }
        ); */


    throw new Error('Revoir votre implémentation, il ya erreur ');

  }



  public afficher():void{
    this.show = !this.show;
  }



}



