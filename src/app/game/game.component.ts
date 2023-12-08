import { Message } from './../../@module/chat.model';
import { ChatService } from './../../@service/chat.service';
import { Router } from '@angular/router';
import { RoomService } from 'src/@service/room.service';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Room } from 'src/@module/room.model';
import { PlaygameService } from 'src/@service/playgame.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, AfterViewChecked{

  @ViewChild('scrollMe')
  private scrollMe!: ElementRef;

  room!:Room;

  test!:string;

  gameService!: PlaygameService;

  chatService!: ChatService;

  greeting: string[] = [];

  watchGame: boolean = this.roomService.watchGame;

  constructor(private roomService:RoomService,private router:Router){}

  ngAfterViewChecked(): void {
    this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
    this.gameService._disconnect();
    this.chatService._disconnect();
  }

  ngOnInit(): void {
    this.gameService = new PlaygameService(this);
    this.gameService.room = this.roomService.room;
    this.gameService.player = this.roomService.player;
    this.gameService.watchGame = this.roomService.watchGame;
    this.room = this.gameService.room; 
    this.gameService._connect();

    this.chatService = new ChatService(this.room.roomNumber);
    this.chatService._connect(message => this.getMessage(message));
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

  toIndex(){
    this.router.navigateByUrl('/index');
  }
  
  exitRoom(){
    if(this.watchGame){
      this.gameService._disconnect();
      this.chatService._disconnect();
      this.toIndex();
    }else{
      this.roomService._removeRoom().subscribe({});
      this.chatService._disconnect();
    }
  }

  restart(){
    this.gameService._restartGame();
  }

  getMessage(message:Message){
    this.greeting.push(message.player + ' : ' + message.message);
  }

  sendMessage(input:HTMLInputElement){
    let send:Message = {
      player: this.watchGame? '觀眾' : this.gameService.player,
      message: input.value
    }
    this.chatService._sendMessage(send);
    input.value = "";
  }
}
