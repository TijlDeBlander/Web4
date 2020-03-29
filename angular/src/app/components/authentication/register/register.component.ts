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
  public registerForm: FormGroup;
  public serverError: string;
  constructor(private as: AuthenticationService,
              private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['',[Validators.email,Validators.required] ],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      birthDate: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit(value){
    let l: Register = value;
    this.as.register(l).subscribe(res => console.log(res), error =>
      this.serverError = error.error)
  }

}
