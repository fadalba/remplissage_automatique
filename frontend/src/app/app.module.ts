import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemeComponent } from './systeme/systeme.component';
import { HeaderComponent } from './header/header.component';
import { NavformComponent } from './navform/navform.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametreComponent } from './parametre/parametre.component';
import { HistoriqueComponent } from './historique/historique.component';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/user.service';
<<<<<<< HEAD
import { Ng2SearchPipeModule } from 'ng2-search-filter';
=======
>>>>>>> cc9c8f9ec99b26cfc5b7d4a72bb9b43f8c365621

const config: SocketIoConfig= {
  url: 'http://localhost:3001',
  options: {
    transports: ['websocket']
  }
}
@NgModule({
  declarations: [
    AppComponent,
    SystemeComponent,
    HeaderComponent,
    NavformComponent,
    ConnexionComponent,
    DashboardComponent,
    ParametreComponent,
    HistoriqueComponent,
    SidebarComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
     ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    Ng2SearchPipeModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
