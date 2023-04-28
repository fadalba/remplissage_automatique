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
  currentDate = new Date();
  CurrentTime: any;
  registerForm!: FormGroup
  submitted = false
  errMsg!:string; 
  Users: any = []
  user: any;
 
  constructor(private formBuilder: FormBuilder, private router: Router ,
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
 
  onSubmit() {
    const id =  localStorage.getItem('id');
    const user ={
      actuelpassword: this.registerForm.value.actuelpassword,
      newpassword: this.registerForm.value.newpassword,
      confirmation: this.registerForm.value.confirmation

 }
    this.submitted = true
  
    if (this.registerForm.invalid) {
      return
    }
    console.log(id);
    // retourne a la page deconnection apres le popup modification reussi
   return this.userService.updatepass(id,user).subscribe((data)=>{
    this.ngOnInit(); 
    
    Swal.fire({
     
      position: 'center',
      icon: 'success',
      title: 'Modification  mot de passe réussi !',
      showConfirmButton: false,
      timer: 1500
    });
   this.userService.doLogout()
   },
   error => {
    this.errMsg = error.error.message
    /* console.log(error.error.message) */
  } )
  
  }

}