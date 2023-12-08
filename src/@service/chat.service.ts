import { Message } from './../@module/chat.model';
//使用 WebSocket 需要引入以下兩個套件。
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class ChatService {
  webSocketEndPoint: string = 'http://172.20.27.74:8080/ws';

  chatOut: string = '/out/chat/';

  stompClient: any;

  roomNumber:string;

  constructor(roomNumber:string){
    this.roomNumber = roomNumber;
  }

  _connect(runMothod:(message:Message)=>void){
    console.log('建立聊天室連線....');

    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    
    const _this = this;

    let roomUrl = this.chatOut + this.roomNumber;
    _this.stompClient.connect({},function (frame:any){
      _this.stompClient.subscribe(roomUrl, function(result: any){
        let message: Message = JSON.parse(result.body);
        runMothod(message);
      });
    },this._errorConnect);
  };

  _disconnect(){
    if(this.stompClient !== null){
      this.stompClient.disconnect();
      console.log("chat 關閉連線");
    }
  }
  
  _errorConnect(error:any){
    console.log('chat 連線異常!! => ' + error);
  }

  _sendMessage(message:Message){
    this.stompClient.send('/chess/chat/' + this.roomNumber, {}, JSON.stringify(message));
  }
}
