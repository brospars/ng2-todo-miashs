import { Component, OnInit, Input, ElementRef, ViewChild  } from '@angular/core';
import { TodoListService } from './../shared/todo-list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('newTodo') newTodo: ElementRef;
  rooms = [];

  constructor(private todoListService: TodoListService, private router: Router) {

  }

  ngOnInit() {
    const that = this;
    this.todoListService.socketEmit('getRooms', {});
    this.todoListService.socketOn('rooms', function(data){
      that.rooms = data;
    });
  }

  getRooms() {
    return this.rooms;
  }

  createTodo() {
    console.log(this.newTodo.nativeElement.value);
    //this.router.navigateByUrl('/todo/' + this.newTodo.nativeElement.value);
  }

}
