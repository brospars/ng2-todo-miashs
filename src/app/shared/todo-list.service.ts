import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class TodoListService {

  socket = new io('http://localhost:3000/');

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

