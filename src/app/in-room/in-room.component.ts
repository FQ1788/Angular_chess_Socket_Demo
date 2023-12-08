import { PlaygameService } from './../../@service/playgame.service';
import { Player } from './../../@module/room.model';
import { Component } from '@angular/core';
import { RoomService } from 'src/@service/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-room',
  templateUrl: './in-room.component.html',
  styleUrls: ['./in-room.component.css']
})
export class InRoomComponent {

  constructor(private roomService: RoomService,private router: Router){}
  
  inRoom(roomNumber: string ,playName: string){
    
    if(!roomNumber && !roomNumber.trim().length){
      alert("請輸入要加入的房間號碼!");
    }else if(!playName && !playName.trim().length){
      alert("請輸入玩家名稱!");
    }else{
      let player: Player = {
        roomNumber: roomNumber,
        player: playName,
        coordinate: []
      }

      this.roomService._inRoom(player).subscribe(room => {
        console.log(room.operateCode);
        if(room.operateCode == '200'){
          this.roomService.room = room;
          this.roomService.player = playName;
          this.roomService.watchGame = false;
          this.router.navigateByUrl('/game'); 
        }else if(room.operateCode == '400'){
          alert("房間不存在");
        }else{
          alert("進入房間發生異常");
        }
      });
    }
  }

  watchGame(roomNumber: string){
    
    if(!roomNumber && !roomNumber.trim().length){
      alert("請輸入要加入的房間號碼!");
    }else{
      let player: Player = {
        roomNumber: roomNumber,
        player: '',
        coordinate: []
      }

      this.roomService._watchRoom(player).subscribe(room => {
        console.log(room.operateCode);
        if(room.operateCode == '200'){
          this.roomService.room = room;
          this.roomService.player = '';
          this.roomService.watchGame = true;
          this.router.navigateByUrl('/game');
        }else if(room.operateCode == '400'){
          alert("房間不存在");
        }else{
          alert("進入房間發生異常");
        }
      });
    }
  }
}
