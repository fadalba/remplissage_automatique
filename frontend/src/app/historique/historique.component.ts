import { Compteur } from './../../../model/compteur';
import { RemplissageService } from './../services/remplissage.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment' // bibliothèque pour manipuler les dates
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  show:boolean=false;
  searchText!: string;
itemsperpage: number =5;
p: number = 1; // pagination index
filtre:  any[] = [];
restaure!:any;  // ecraser les données de la recherche
total1: number = 0; // pour bouteille 100ml
total2: number = 0; // pour bouteille  200ml
totalLenght: string|number|undefined;



constructor(private http: HttpClient,private service: RemplissageService) {}
  ngOnInit(): void {
  /*   // calcul
  this.http.get('/api/getAllc').pipe(
    map((data: any[]) => {
      // Calculer les totaux
      this.total1 = data.reduce((acc, curr) => {
        const date = moment(curr.date);
        if (date.hours() < 24) {
          acc += curr.total1;
        }
        return acc;
      }, 0);

      this.total2 = data.reduce((acc, curr) => {
        const date = moment(curr.date);
        if (date.hours() < 24) {
          acc += curr.total2;
        }
        return acc;
      }, 0);

      // Ajouter les totaux au tableau historique
      this.filtre = data.concat({
        total1: this.total1,
        total2: this.total2,
        date: null, // Vous pouvez utiliser la date d'aujourd'hui ou null si vous n'avez pas besoin de l'afficher dans le tableau
        heure: null // De même pour l'heure
      });
    })
  ).subscribe();
}

 */

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



    throw new Error('Revoir votre implémentation, il ya erreur ');
  }


  public afficher():void{
    this.show = !this.show;
  }


  //recherche par calendrier

calend(e:any) {
  const search = new Date(e.target.value)
 console.log(e.target.value)
  if (e.target.value == '') { // pour vider la recherche et restaurer la liste
    this.filtre = this.restaure as unknown as Compteur[]
    return
  }


  this.filtre = this.filtre.filter((el:any) => { // pour filtrer la recherche
    const date = new Date(el.date)

    console.log(date.getFullYear(), search.getFullYear(), search.getMonth(), search.getDate())

    return date.getMonth() === search.getMonth() && date.getDate() === search.getDate();
  })




}

}



