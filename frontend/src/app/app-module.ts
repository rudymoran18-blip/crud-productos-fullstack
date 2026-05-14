import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { FormProductos } from './components/form-productos/form-productos';
import { LstProductos } from './components/lst-productos/lst-productos';
import { Navbar } from './navbar/navbar/navbar';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer-component/footer-component';

@NgModule({
  declarations: [
    App,
    FormProductos,
    Navbar,
    LstProductos,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
     positionClass: 'toast-top-right',
     timeOut: 5000,
     closeButton: true,
     progressBar: true
    }
    )
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
