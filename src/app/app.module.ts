import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { TabBarModule } from './tab-bar';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TabBarModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
