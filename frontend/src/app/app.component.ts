import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
showHead: any;

currentDate = new Date();
CurrentTime: any;
constructor(private router: Router ) {
  setInterval(() => {
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, + 1);
console.log(this.currentDate);

}
logout() {
  // this.userService.getLogOut();
  // this.router.navigateByUrl('login')
  Swal.fire({
    title: 'Voulez-vous vous vous deconnecter?',
    icon: 'warning',
    confirmButtonColor: "#B82010 ",
    cancelButtonColor: "blue" ,
    showCancelButton: true,
    confirmButtonText: 'oui',
    cancelButtonText: 'Annuler',


  })
  .then((result) => {
    if(result.isConfirmed){
      this.router.navigateByUrl('login')
      localStorage.removeItem('currentUser');
      localStorage.removeItem('prenom');
      localStorage.removeItem('nom');
    localStorage.removeItem('email');
    }
  })
}
ngOnInit(): void {
}
}



