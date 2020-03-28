import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../../models/requests/login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public serverError: string;
  public loginForm: FormGroup;
  constructor(private as: AuthenticationService,
              private fb: FormBuilder,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: [' ',[Validators.email,Validators.required] ],
      password: [' ', [Validators.required]]
    });
  }

  ngOnInit() {
    if(this.as.isAuthenticated())
      this.router.navigate(['/product-overview'])
  }

  login(value){
    let l: Login = value;
    this.as.login(l).subscribe(res =>{
      this.router.navigateByUrl('product-overview').then(r => console.log(r));
    }, error =>{
      this.serverError = error.error;
      console.log(error)
    } )
  }

}
