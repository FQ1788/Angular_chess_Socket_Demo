import { Player, Room } from './../../@module/room.model';
import { HttpClient } from '@angular/common/http';
import { RoomService } from '../../@service/room.service';
import { Component, OnInit } from '@angular/core';
import { PlaygameService } from 'src/@service/playgame.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-room',
  templateUrl: './open-room.component.html',
  styleUrls: ['./open-room.component.css']
})
export class OpenRoomComponent{
  
  constructor(private roomService: RoomService, private router:Router){}

  addRoom(playName:string){
    if(playName && playName.trim().length){
      let player : Player = {
        roomNumber : '',
        player : playName,
        coordinate : []
      };
      this.roomService._addRoom(player).subscribe(room => {
        console.log(room.operateCode);
        if(room.operateCode == '200'){
          this.roomService.room = room;
          this.roomService.player = playName;
          this.roomService.watchGame = false;
          this.router.navigateByUrl('/game');
        }
      });
    }else{
      alert('請輸入玩家名稱');
    };
  }
}
