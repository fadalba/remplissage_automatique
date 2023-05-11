import { Compteur } from './../../../model/compteur';
import { RemplissageService } from './../services/remplissage.service';
import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import jsPDF from 'jspdf'; // importation de package pour le pdf
import html2canvas from 'html2canvas'; // importation de package pour le pd

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef; // pour le téléchargement en pdf
  filterTerm!:string;
  show:boolean=false;
public hist:any=[];
itemsperpage: number =5;
p: number = 1; // pagination index
startDate:any; // la date de debut
endDate:any; //la date de fin
showForm= false; // pour faire apparaite le formulaire de rapport de recherche
 filtre:  any[] = [];
restaure!:any;  // ecraser les données de la recherche
total1: number = 0; // pour bouteille 100ml
total2: number = 0; // pour bouteille  200ml
/* totalG1: number = 0; */
totalLenght: string|number|undefined;
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


    throw new Error('Revoir votre implémentation, il ya erreur ');

  }



  public afficher():void{
    this.show = !this.show;
  }

  

  /* *****************************************************Téléchargement en pdf ******************/
  
  public openPDF(): void {
  const title = 'Rapport de remplissage imprimé le :';
  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    const PDF = new jsPDF('p', 'mm', 'a4');
    const position = 20; // position de déclage  aven haut du tableau

 // Ajouter l'image
 const logo = new Image();
  logo.src = './assets/logo.png';
 logo.onload = function() {
   PDF.addImage(logo, 'PNG', 2, 2, 15, 15);


    // Ajouter l'en-tête avec le titre et la date
    PDF.text(title, 24, 10);//position X, Y
    PDF.text(new Date().toLocaleString(), 120, 10);

    

    // Ajouter l'image
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

    // Enregistrer le document PDF
    PDF.save('rapport système de remplissage.pdf');
 }
  });
}

/* *****************************************************Téléchargement en pdf ******************/

}


