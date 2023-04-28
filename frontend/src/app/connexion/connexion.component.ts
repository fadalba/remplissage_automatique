import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  [x: string]: any;
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  errorSms:any;
  spin= false;
  verifPass: any = true;
  invalid= false;
  errorMsg:any;
  donnee:any;

constructor(private userService : UsersService, private formBuilder: FormBuilder ,private route: Router) {

}

ngOnInit() {
  this.registerForm = this.formBuilder.group({

    email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

    password:['',[Validators.required,Validators.minLength(8)]],

    })


}


    onSubmit(){
      this.submitted = true
      this.spin = true

       if(this.registerForm.invalid){
       /*  this.spin = false */
        return ;
      }

       /* /insertion sur la base de données/ */
        const user ={

         email : this.registerForm.value. email,
         password: this.registerForm.value. password,

        }
  //Redirection apres la connexion
        this.userService.getConnexion(user).subscribe(
         data=>{
         // localStorage.setItem('currentUser', JSON.stringify(data.token));
           /*  console.log(data) */
                this.route.navigateByUrl('dashboard')
                this.spin = true

          },
          /* verifie si l'utilisateur n'est pas dans la base de donnée ou l'utilisateur est archiver */
          error=>{
            /*  console.log(error) */
           /*  console.log(error) */
             if(error == 'Unauthorized'){
               this.errorSms ='Cette utilisateur est archivé'
               this.spin = false
               setTimeout(()=>{ this.errorSms = false}, 3001);
               
             }else {

             this.errorSms ='Vous  etes pas dans la base de données'
             this.spin = false
             setTimeout(()=>{ this.errorSms = true}, 3001);
           }
           }
         );

      }

}
