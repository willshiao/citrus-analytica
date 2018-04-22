import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatsComponent} from './chats/chats.component';
import {StatsComponent} from './stats/stats.component';
import {StatsModule} from './stats/stats.module';
import {ChatsModule} from './chats/chats.module';

const routes: Routes = [
  { path: 'chats', component: ChatsComponent },
  { path: 'stats', component: StatsComponent },
  { path: '', redirectTo: '/chats', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
