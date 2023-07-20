import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { InRoomComponent } from './in-room/in-room.component';
import { OpenRoomComponent } from './open-room/open-room.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path : 'index', component : IndexComponent },
  { path : 'inRoom', component : InRoomComponent },
  { path : 'openRoom', component : OpenRoomComponent},
  { path : 'game', component : GameComponent},
  { path : '', redirectTo : '/index', pathMatch : 'full' },
  { path : '**',redirectTo:'/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
