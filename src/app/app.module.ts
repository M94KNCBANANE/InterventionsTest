import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {RouterModule} from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { problemeData } from './probleme/probleme-data';
import { TypeDeProblemeService } from './probleme/type-de-probleme.service';
import { ProblemeService } from './probleme/probleme.service';



@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule],
  providers: [TypeDeProblemeService, ProblemeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
