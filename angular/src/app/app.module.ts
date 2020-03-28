import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {appRoutingModule} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductOverviewComponent } from './components/shared/product-overview/product-overview.component';
import { ProductFormComponent } from './components/shared/product-form/product-form.component';
import { ProductManagerComponent } from './components/Admin/product-manager/product-manager.component';
import {AuthTokenInterceptor} from './_helpers/jwt-interceptor';
import { MainPageComponent } from './components/customer/main-page/main-page.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthGuardService} from './_helpers/AuthGuardService';
import { CartComponent } from './components/customer/cart/cart.component';
import {RoleGuardService} from './_helpers/RoleGuardService';
import {UserManagerComponent} from './components/Admin/user-manager/user-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductOverviewComponent,
    ProductFormComponent,
    ProductManagerComponent,
    MainPageComponent,
    NavbarComponent,
    CartComponent,
    UserManagerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    appRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  },
    JwtHelperService,
    AuthGuardService,
    RoleGuardService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
