import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from '../must-match.validator';
import { UsersService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit{
  [x: string]: any;
  currentDate = new Date();
  CurrentTime: any;
  registerForm!: FormGroup
  submitted = false
  errMsg!:string;
  Users: any = []
  user: any;
  spin= false;
  errorSms:any = true;
  showMessage: boolean = false;
succes!:any;
  constructor(private formBuilder: FormBuilder, private route: Router ,
    private userService: UsersService) {
      this.registerForm = this.formBuilder.group({
        actuelpassword:['', [Validators.required, Validators.minLength(6)]],
        newpassword:['', [Validators.required, Validators.minLength(6)]],
        confirmation: ['', [Validators.required]],
      }, { validator: MustMatch('newpassword', 'confirmation')
      }
      );
/*     setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, + 1);
console.log(this.currentDate);
 */
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.user = data
      this.Users = this.user.filter((e: any) => e.etat == true)
      console.log(this.Users)
    })
  }
  onSubmit(){

    this.submitted = true
    this.spin = true

     if(this.registerForm.invalid){
      this.spin = false

    }
    console.log(this.registerForm.value);

     const user = {
      newpassword: this.registerForm.value.newpassword,
      actuelpassword: this.registerForm.value.actuelpassword

     }

     const id1= localStorage.getItem('id')?.replace(/"/g, '');
     const id =  id1?.split(' ').join('')   //'6422b5d3c8018ff8248ecefd'

       return this.userService.modifpass(id,user).subscribe(res=>{
        window.location.reload()
        this.succes = "modifier avec succes"
        alert("modifier avec succes")
        // this.route.navigateByUrl('dashboard')
            console.log(res);

       },
       )

    }


    checkPassword = () => {

      let pass1 = this.registerForm.value.actuelpassword//(<HTMLInputElement>document.getElementById("pass1")).value;
      let pass2 = this.registerForm.value.newpassword//(<HTMLInputElement>document.getElementById("pass2")).value;
    /*
      console.log(pass1 != pass2) */

      if (pass1 != pass2) {
        this.errorSms ='Mot de passe incorrect'
               this.spin = false
               setTimeout(()=>{ this.errorSms = true}, 3000);
      }

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
        cancelButtonText: 'NON',


      })
      .then((result) => {
        if(result.isConfirmed){
          this.route.navigateByUrl('')
          localStorage.removeItem('currentUser');
          localStorage.removeItem('prenom');
          localStorage.removeItem('nom');
          localStorage.removeItem('id');
        localStorage.removeItem('email');
        }
      })
    }
}
