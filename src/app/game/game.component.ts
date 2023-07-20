import { RoomService } from 'src/@service/room.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/@module/room.model';
import { PlaygameService } from 'src/@service/playgame.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  room!:Room;

  test!:string;

  gameService!: PlaygameService;

  constructor(private roomService:RoomService){}

  ngOnInit(): void {
    this.gameService = new PlaygameService(this);
    this.gameService.room = this.roomService.room;
    this.gameService.player = this.roomService.player;
    this.room = this.gameService.room; 
    this.gameService._connect();
  }

  playerAction(y:number,x:number){
    console.log(" Y : " + y);
    console.log(" X : " + x);
    this.gameService._playerAction(y,x);
  }

  setRoom(room: Room){
    this.room = room;
  }

  checkPush(push: boolean){
    if(push){
      return "Push";
    }else{
      return "NotPush";
    }
  }
}
