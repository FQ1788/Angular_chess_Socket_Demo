import { Player, Room } from './../../@module/room.model';
import { HttpClient } from '@angular/common/http';
import { RoomService } from '../../@service/room.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-room',
  templateUrl: './open-room.component.html',
  styleUrls: ['./open-room.component.css']
})
export class OpenRoomComponent{
  
  constructor(private roomService: RoomService){}

  addRoom(username:string){
    if(username && username.trim().length){
      let player : Player = {
        roomNumber : '',
        player : username,
        coordinate : []
      };
      this.roomService._addRoom(player).subscribe(room => {
        console.log(room.operateCode);
        console.log(room.roomNumber);
        console.log(room.chessboard);
        console.log(room.playerOne);
        console.log(room.playerTwo);
      });
    }else{
      alert('請輸入玩家名稱');
    };
  }
}
