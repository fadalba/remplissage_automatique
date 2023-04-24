import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  registerForm!: FormGroup
  submitted = false

  constructor(private formBuilder: FormBuilder, private router: Router ) {
    this.registerForm = this.formBuilder.group({
      actuelpassword:['', [Validators.required, Validators.minLength(6)]],
      newpassword:['', [Validators.required, Validators.minLength(6)]],
      confirmation: ['', [Validators.required, Validators.minLength(6)]],
    })
  

}
onSubmit() {
  this.submitted = true

  if (this.registerForm.invalid) {
    return
  }

}
}
