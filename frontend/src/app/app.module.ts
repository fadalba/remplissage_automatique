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
import { HistoriqueComponent } from './historique/historique.component'

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
    
    SidebarComponent,
    DashboardComponent,
    ParametreComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
     ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
