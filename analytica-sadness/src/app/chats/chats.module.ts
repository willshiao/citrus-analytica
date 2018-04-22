import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {ChatsComponent} from './chats.component';

@NgModule({
  imports: [
    AppRoutingModule
  ],
  declarations: [
    ChatsComponent
  ]
})
export class ChatsModule { }
