import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HeaderComponent } from './header/header.component';
import { SystemeComponent } from './systeme/systeme.component';
import { NavformComponent } from './navform/navform.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthuserGuard } from './auth/authuser.guard';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent, canActivate: [AuthGuard] },
  { path:'systeme',component: SystemeComponent},
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
   { path: 'formulaire', component:NavformComponent, canActivate:[AuthuserGuard]},
   {path: 'sidebar', component:SidebarComponent ,canActivate:[AuthGuard]},
   {path: 'dashboard', component:DashboardComponent /*,canActivate:[AuthGuard]*/},



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
