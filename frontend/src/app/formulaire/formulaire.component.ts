import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from '../must-match.validator';
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit{
  registerForm!: FormGroup
  submitted = false
f: any;

  constructor(private formBuilder: FormBuilder, private router: Router ) { }
  ngOnInit() {

   
    this.registerForm = this.formBuilder.group({
      actuelpassword:['', [Validators.required, Validators.minLength(6)]],
      newpassword:['', [Validators.required, Validators.minLength(6)]],
      confirmation: ['', [Validators.required]],
    }, { validator: MustMatch('newpassword', 'confirmation') 
    }
    );


}

/* get f() { return this.registerForm.controls; } */
onSubmit() {
  this.submitted = true

  if (this.registerForm.invalid) {
    return
  }

}
}
