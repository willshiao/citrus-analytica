import { BrowserModule } from '@angular/platform-browser';
import {ApplicationRef, NgModule} from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatsComponent } from './chats/chats.component';
import { StatsComponent } from './stats/stats.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
