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

  constructor(private http:HttpClient) {}

  _addRoom(player:Player){
    return this.http.post<Room>(this.addRoomUrl,player);
  }

  _inRoom(player:Player){
    return this.http.post<Room>(this.inRoomUrl,player);
  }
}
