import { Injectable } from '@angular/core';
//使用 WebSocket 需要引入以下兩個套件。
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { InRoomComponent } from 'src/app/in-room/in-room.component';

@Injectable({
  providedIn: 'root'
})
export class InRoomService {
  webSocketEndPoint: string = 'http://localhost:8080/ws';

  addroomOut: string = '/addroom/out';

  stompClient: any;

  inRoomComponent!: InRoomComponent;

  constructor(InRoomComponent: InRoomComponent ) { 
    this.inRoomComponent = InRoomComponent;
  }

  _connect(){
    console.log('建立Server連線....');

    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    
    const _this = this;

    _this.stompClient.connect({},function (frame:any){
      _this.stompClient.subscribe(_this.addroomOut,function(result: any){
        console.log(JSON.parse(result.body));
      });
    },this._errorConnect);
  };

  _disconnect(){
    if(this.stompClient !== null){
      this.stompClient.disconnect();
      console.log("關閉連線");
    }
  }
  
  _errorConnect(error:any){
    console.log('連線異常!! => ' + error);
  }

  _inRoom(username: string, roomNumber: string){
    this.stompClient.send('/chess/inRoom',{},JSON.stringify({"username" : username,"roomNumber":roomNumber}));
  }
}
