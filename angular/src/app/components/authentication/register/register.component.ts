import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {Login} from '../../../models/requests/login';
import {Register} from '../../../models/requests/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  constructor(private as: AuthenticationService,
              private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['example@mail.com',[Validators.email,Validators.required] ],
      birthdate: ['',[Validators.required] ],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  login(value){
    let l: Register = value;
    this.as.register(l).subscribe(res => console.log(res), error => console.log(error))
  }

}
