import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { InRoomComponent } from './in-room/in-room.component';
import { OpenRoomComponent } from './open-room/open-room.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    InRoomComponent,
    OpenRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
