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
          this.router.navigateByUrl('/game');
        }
      });
    }
  }
}
