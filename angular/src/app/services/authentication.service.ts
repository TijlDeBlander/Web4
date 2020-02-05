import {EventEmitter, Injectable, Output} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../models/requests/login';
import {Register} from '../models/requests/register';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = `${environment.apiUrl}auth/`;
  @Output() isLoggedInEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  private readonly _tokenKey:string = `user`;
  private userRole: string;
  private token;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
    let parsedToken = this.parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }}

    logout(){
    localStorage.clear();
    this.token = null;
    this.isLoggedInEmitter.emit(false);
    this.router.navigate(['login'])
    }

  public login(loginRequest: Login): Observable<boolean> {

    return this.http.post(
      `${this.url}login`,
      loginRequest,
      {responseType:'json'}).pipe(map((token: any)=>{
      if(token){
        localStorage.setItem(this._tokenKey,JSON.stringify(token));
        this.parseJwt(token)
        this.isLoggedInEmitter.emit(true);
        return true;
      }
      else {
        return false;
      }
    }));

  }

  public register(registerRequest: Register): Observable<string> {
    return this.http.post<string>(`${this.url}register`, registerRequest);
  }

  parseJwt(token) {
    if (!token) {
      return null;
    }
    const base64Token = token.split('.')[1];
    const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
    const userid = JSON.parse(window.atob(base64)).unique_name;
    localStorage.setItem('userId', JSON.stringify(userid));
    this.userRole = JSON.parse(window.atob(base64)).role;
    return JSON.parse(window.atob(base64));
  }

  getToken(){
    let item = JSON.parse(localStorage.getItem(this._tokenKey));
    if(item){
      this.parseJwt(item.token);
      return item;
    }
  }

  public getRole(){
    return this.userRole;
  }
  public isAuthenticated():boolean{
    return !this.jwtHelper.isTokenExpired(localStorage.getItem(this._tokenKey))
  }

  getUserObject(): Observable<User>{
    return this.http.get<User>(`${this.url}${this.getUser()}`)
  }

  getUser(){
    return JSON.parse(localStorage.getItem('userId'));
  }
}
