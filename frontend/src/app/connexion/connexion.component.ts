import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
registerForm!: FormGroup
submitted = false

constructor(private formBuilder: FormBuilder, private router: Router ) {
  this.registerForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

}

onSubmit() {
  this.submitted = true

  if (this.registerForm.invalid) {
    return
  }

}}
