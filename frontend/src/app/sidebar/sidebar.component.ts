import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from '../must-match.validator';

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
 
  constructor(private formBuilder: FormBuilder, private router: Router  ) {
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, + 1);
console.log(this.currentDate);

  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      actuelpassword:['', [Validators.required, Validators.minLength(6)]],
      newpassword:['', [Validators.required, Validators.minLength(6)]],
      confirmation: ['', [Validators.required]],
    }, { validator: MustMatch('newpassword', 'confirmation') 
    }
    );
  }
 
  onSubmit() {
    this.submitted = true
  
    if (this.registerForm.invalid) {
      return
    }
  
  }
}
