import { GameComponent } from './../app/game/game.component';
import { Player, Room } from 'src/@module/room.model';
import { Injectable } from '@angular/core';
//使用 WebSocket 需要引入以下兩個套件。
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})

export class PlaygameService {
  webSocketEndPoint: string = 'http://172.20.27.74:8080/ws';

  roomOut: string = '/out/';

  player!: string;

  room!: Room;

  stompClient: any;

  gameComponent!:GameComponent;

  constructor(gameComponent:GameComponent){
    this.gameComponent = gameComponent;
  }

  _connect(){
    console.log('建立Server連線....');

    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    
    const _this = this;

    let roomUrl = this.roomOut + this.room.roomNumber;

    _this.stompClient.connect({},function (frame:any){
      _this.stompClient.subscribe(roomUrl, function(result: any){
        let room: Room = JSON.parse(result.body);
        if(room.operateCode == "200"){
          _this.room = room;
          _this.gameComponent.setRoom(_this.room);
        }else if(room.operateCode == "100"){
          _this.gameComponent.toIndex();
        }
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

  _playerAction(y:number, x:number){
    let player: Player = {
      roomNumber: this.room.roomNumber,
      player: this.player,
      coordinate: [y,x]
    }
    this.stompClient.send('/chess/playerAction/' + this.room.roomNumber, {}, JSON.stringify(player));
  }

  _restartGame(){
    let player:Player = {
      roomNumber: this.room.roomNumber,
      player: this.player,
      coordinate: []
    }
    this.stompClient.send('/chess/restartGame/' + this.room.roomNumber, {}, JSON.stringify(player));
  }
}
