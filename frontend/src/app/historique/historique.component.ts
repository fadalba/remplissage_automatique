import { Compteur } from './../../../model/compteur';
import { RemplissageService } from './../services/remplissage.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
 /* ****************************************Téléchargement pdf ********************************************************* */
/*
 downloadPdf() { // fonction pour telecharger l'historique des donnees de la serre
  const startDate = new Date(this.startDate); // date de debut egalt date de debut choisie dans le formulaire
const endDate = new Date(this.endDate); // de meme que date de fin
this.service.getData().subscribe((data: any) => {
const filteredData = data.filter((item: any) => { //filtrer les donnee a partir des date
  const date = new Date(item.date);
  return date >= startDate && date <= endDate; // retourner les donnner tous les date se trouvant entre la date de but et de fin chosie
});
    const docDefinition = { // definition du doccument
      content: [
        { text: 'Historique des remplissages à la période du  ', style: 'header' }, //texte d'entete
        {
          table: {
            headerRows: 1,
            widths: ['*', '*','*'], // nombre de colonne
            body: [ //le corps du document
              [
                { text: 'Date', style: 'tableHeader', fillColor: '#477AFD' },// titre de chaque colonne
                { text: 'Bouteilles 100 ml', style: 'tableHeader', fillColor: '#477AFD' },
                { text: 'Bouteilles 200 ml', style: 'tableHeader', fillColor: '#477AFD' },

              ],


              ...filteredData.map((item: any) =>  [item.date, item.total1, item.total2])
            ]
          },
          style: 'data'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true },// style du heder
        data: { fontSize: 11 },// style des donnees
        tableHeader: { bold: true, fontSize: 11, color: 'white' } // style de l'entete des colone
      }
    };
    pdfMake.createPdf(docDefinition).download();  // on apel la fonction en lui passant le document a telecharger
    pdfMake.createPdf(docDefinition).print();
  });
} */

downloadPdf(): void {
  const startDate: Date = new Date(this.startDate);
  const endDate: Date = new Date(this.endDate);
  if (startDate > endDate) {
    console.error('La date de fin doit être supérieure à la date de début');
    return;
  }
  this.service.getData().subscribe(
    (data1: any) => {
      const filteredData: any[] = data1.filter((item: any) => {
        const date: Date = new Date(item.date);
        return date >= startDate && date <= endDate;
      });
      const docDefinition = {
        content: [
          { text: `Rapport de remplissages du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()}`, style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*'],
              body: [
                [
                  { text: 'Date', style: 'tableHeader', fillColor: '#477AFD' },
                  { text: 'Bouteilles 100 ml', style: 'tableHeader', fillColor: '#477AFD' },
                  { text: 'Bouteilles 200 ml', style: 'tableHeader', fillColor: '#477AFD' },
                ],
                ...filteredData.map((item: any) => [item.date, item.total1, item.total2]),
            
              ],
            },
            style: 'data',
          },
        ],
        styles: {
          header: { fontSize: 18, bold: true },
          data: { fontSize: 11 },
          tableHeader: { bold: true, fontSize: 11, color: 'white' },
        },
      };
      pdfMake.createPdf(docDefinition).download();
      pdfMake.createPdf(docDefinition).print();
    },
    (error: any) => {
      console.error('Une erreur s\'est produite lors du chargement des données', error);
    },
  );
}

/* ****************************************fin Téléchargement pdf ********************************************************* */

}



