import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class TodoListService {
  socketURL = 'http://localhost:3000/';
  socket = new io(this.socketURL);

  constructor() {
  }

  socketOn(eventName, callback) {
    this.socket.on(eventName, function(data){
      callback(data);
    });
  }

  socketEmit(eventName, data) {
    this.socket.emit(eventName, data);
  }
}

