import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { InRoomComponent } from './in-room/in-room.component';
import { OpenRoomComponent } from './open-room/open-room.component';

const routes: Routes = [
  { path : 'index', component : IndexComponent },
  { path : 'inRoom', component : InRoomComponent },
  { path : 'openRoom', component : OpenRoomComponent},
  { path : '', redirectTo : '/index', pathMatch : 'full' },
  { path : '**',redirectTo:'/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
