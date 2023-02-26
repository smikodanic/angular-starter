/* MODULES */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* COMPONENTS */
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { NavComponent } from './shared/components/app-nav/nav.component';

/* SERVICES */
import { IsLoggedService, HasRoleService, AutologinService } from './ng/modules/ngboost-auth';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AutologinService] },
  { path: 'admin', component: AdminComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'customer', component: CustomerComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    AdminComponent,
    CustomerComponent,
    NotfoundComponent,
    NavComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
