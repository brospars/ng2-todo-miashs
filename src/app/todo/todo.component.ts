import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { TodoListService } from './../shared/todo-list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input ('nf') nf;
  @ViewChild('newText') newTextInput: ElementRef;
  editing: boolean;

  constructor(private todoListService: TodoListService) {
    this.editing = false;
  }

  ngOnInit() {
  }

  dispose() {
    this.todoListService.socketEmit('dispose', this.nf.id);
  }

  fait(fait: boolean) {
    this.todoListService.socketEmit('fait', {id: this.nf.id});
  }

  edit() {
    this.editing = true;
    requestAnimationFrame(() => {
      this.newTextInput.nativeElement.focus();
    });
  }

  setText(value) {
    this.todoListService.socketEmit('change', { texte: value, id : this.nf.id });
    this.editing = false;
  }
}
