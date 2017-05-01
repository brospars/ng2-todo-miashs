import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoListService } from './../shared/todo-list.service';
import { TodoFilter } from './../shared/todo-filter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() title: string;
  @ViewChild('newTodo') newTodo: ElementRef;
  private choses;
  toggle: boolean;
  filterAll: TodoFilter;
  filterCompleted: TodoFilter;
  filterActives: TodoFilter;
  currentFilter: TodoFilter;

  constructor (private todoListService: TodoListService, private route: ActivatedRoute) {
    this.choses = [];
    this.toggle = false;
    this.filterAll = () => true;
    this.filterCompleted = (c) => c.fait;
    this.filterActives = (c) => !c.fait;
    this.currentFilter = this.filterAll;
  }

  ngOnInit() {
    const that = this;

    this.route.params.subscribe(params => {
      if (params['roomName']) {
        this.title = params['roomName'];
        this.todoListService.socketEmit('init', {room: params['roomName']});
      }
    });

    this.todoListService.socketOn('update', function(data){
      that.choses = data;
    });
  }

  getChoses() {
    return this.choses.filter(this.currentFilter);
  }

  getCountTodo() {
    return this.choses.reduce((acc, chose) => {
      return acc + (chose.fait ? 0 : 1);
    }, 0);
  }

  getCountCompleted() {
    return this.choses.reduce((acc, chose) => {
      return acc + (chose.fait ? 1 : 0);
    }, 0);
  }

  disposeAll() {
    const that = this;
    return this.choses.filter(this.filterCompleted).forEach(c => that.todoListService.socketEmit('dispose', c.id));
  }

  addTodo() {
    this.todoListService.socketEmit('add', { texte: this.newTodo.nativeElement.value, fait: false, date: new Date()});
    this.newTodo.nativeElement.value = '';
  }

  toggleAllChange() {
    const that = this;
    const check = !this.toggleAll();
    this.choses.forEach(function(c){
      that.todoListService.socketEmit('fait', {id: c.id, toggleAll: check});
    });
  }

  toggleAll(): boolean {
    return this.choses.reduce((acc, c) => acc && c.fait, true);
  }
}
