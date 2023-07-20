import { Player, Room } from '../@module/room.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  room!:Room;

  player!:string;

  addRoomUrl: string = '/api/addRoom';
  
  inRoomUrl: string = '/api/inRoom';

  removeRoomUrl: string = '/api/removeRoom';

  constructor(private http:HttpClient) {}

  _addRoom(player:Player){
    return this.http.post<Room>(this.addRoomUrl,player);
  }

  _inRoom(player:Player){
    return this.http.post<Room>(this.inRoomUrl,player);
  }

  _removeRoom(){
    let play: Player = {
      roomNumber: this.room.roomNumber,
      player: this.player,
      coordinate: []
    }
    console.log('roomNumber : ' + play.roomNumber);
    console.log('player : ' + play.player);
    return this.http.post(this.removeRoomUrl,play);
  }
}
