import { Compteur } from './../../../model/compteur';
import { RemplissageService } from './../services/remplissage.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



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
startDate:any; // la date de debut
endDate:any; //la date de fin
showForm= false; // pour faire apparaite le formulaire de telechargement
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



// pdf telecharrger 

downloadPdf() { // fonction pour telecharger l'historique des donnees de la serre
  const startDate = new Date(this.startDate); // date de debut egalt date de debut choisie dans le formulaire
const endDate = new Date(this.endDate); // de meme que date de fin
this.service.getData().subscribe((data: any) => {
const filteredData = data.filter((histo: any) => { //filtrer les donnee a partir des date
  const date = new Date(histo.Date);
  return date >= startDate && date <= endDate; // retourner les donnner tous les date se trouvant entre la date de but et de fin chosie
});
    const docDefinition = { // definition du doccument
      content: [
        { text: 'HSITORIQUES ', style: 'header' }, //texte d'entete
        {
          table: {
            headerRows: 1,
            widths: ['*', '*','*', '*'], // nombre de colonne
            body: [ //le corps du document
              [
                { text: 'Date', style: 'tableHeader', fillColor: '#477AFD' },// titre de chaque colone
                { text: 'Bouteille 100ml', style: 'tableHeader', fillColor: '#477AFD' },
                { text: 'Bouteille 200ml', style: 'tableHeader', fillColor: '#477AFD' },
                
              ],

             
              ...filteredData.map((histo: any) =>  [histo.date, histo.heure, histo.total1, histo.total2])
            ]
          },
          style: 'data'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true },// style du header
        data: { fontSize: 11 },// style des donnees
        tableHeader: { bold: true, fontSize: 11, color: 'white' } // style de l'entete des colonne
      }
    };
    pdfMake.createPdf(docDefinition).download(); // on apel la fonction en lui passant le document a telecharger
  });
}
// fin






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



