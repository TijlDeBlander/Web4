import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {Register} from './models/requests/register';
import {RegisterComponent} from './components/authentication/register/register.component';
import {ProductOverviewComponent} from './components/shared/product-overview/product-overview.component';
import {ProductManagerComponent} from './components/Admin/product-manager/product-manager.component';
import {ProductFormComponent} from './components/shared/product-form/product-form.component';
import {MainPageComponent} from './components/customer/main-page/main-page.component';
import {AuthGuardService} from './_helpers/AuthGuardService';
import {CartComponent} from './components/customer/cart/cart.component';
import {RoleGuardService} from './_helpers/RoleGuardService';
import {UserManagerComponent} from './components/Admin/user-manager/user-manager.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'product-overview',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'product-manager',
    component: ProductManagerComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },{
    path:'edit-product/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-manager',
    component: UserManagerComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'Admin'
    }
  },
  {
    path:'cart',
    component: CartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**', pathMatch: 'full', component: LoginComponent
  }
];

export const appRoutingModule = RouterModule.forRoot(routes);
