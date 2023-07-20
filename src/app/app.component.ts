import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chess_Socket_Demo';

  constructor(private router:Router){}

  get showBtn(){
    return this.router.url == "/game";
  }
}
