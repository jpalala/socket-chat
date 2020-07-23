import {Component, OnInit, } from '@angular/core';
// import {Component, OnInit,  Output, EventEmitter } from '@angular/core';

import {ChatService} from '../chat.service';

// import * as moment from 'moment';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: string;
  messages: string[] = [];
  secretCode: string;
  counter = 0;
  // @Output() submitMessage = new EventEmitter();

  constructor(private chatService: ChatService) {
    this.secretCode = 'DONT TELL';
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
  //  this.submitMessage.emit(this.message);
    console.log(this.message);
    this.counter = this.counter + 1;
    // this.messages.push(this.message);
    this.message = '';
    
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .distinctUntilChanged()
      .throttleTime(1000)
      .filter((message) => message.trim().length > 0)
      .subscribe((message: string) => {
        const currentTime = Date.now(); // moment().format('hh:mm:ss a');
        const messageWithTimestamp = `${currentTime}: ${message}`;
        this.messages.push(messageWithTimestamp);
      });
      /*
      
      .skipWhile((message) => message !== this.secretCode)
      .scan((acc: string, message: string, index: number) =>
          `${message}(${index + 1})`
        , 1)
      */
       
  }
}
