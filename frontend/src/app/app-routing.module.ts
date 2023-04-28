import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HeaderComponent } from './header/header.component';
import { SystemeComponent } from './systeme/systeme.component';
import { NavformComponent } from './navform/navform.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthuserGuard } from './auth/authuser.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametreComponent } from './parametre/parametre.component';
import { HistoriqueComponent } from './historique/historique.component';

const routes: Routes = [
  { path: '', component: ConnexionComponent, canActivate: [AuthGuard] },
  { path:'systeme',component: SystemeComponent},
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'formulaire', component:NavformComponent, canActivate:[AuthuserGuard]},
  {path: 'dashboard', component:DashboardComponent ,canActivate:[AuthGuard]},
  {path: 'parametre', component:ParametreComponent ,canActivate:[AuthGuard]},
  {path: 'historique', component:HistoriqueComponent ,canActivate:[AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

