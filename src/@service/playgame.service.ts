import { Room } from 'src/@module/room.model';
import { Injectable } from '@angular/core';
//使用 WebSocket 需要引入以下兩個套件。
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class PlaygameService {
  webSocketEndPoint: string = 'http://localhost:8080/ws';

  roomOut: string = '/out/';
  roomNumber: String;

  stompClient: any;

  constructor(roomNumber: String) { 
    this.roomNumber = roomNumber;
  }

  _connect(){
    console.log('建立Server連線....');

    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    
    const _this = this;

    let roomUrl = this.roomOut + this.roomNumber;

    _this.stompClient.connect({},function (frame:any){
      _this.stompClient.subscribe(roomUrl, function(result: any){
        let room: Room = result.body;
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
    this.stompClient.send('/chess/playerAction/' + roomNumber, {}, JSON.stringify({"username" : username,"roomNumber":roomNumber}));
  }
}
