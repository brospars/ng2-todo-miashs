
'use strict';

var Todo = require('./Todo.js');

class TodoList {
  constructor() {
    this.choses = [];
    this.currentId = 1;
  }

  Ajouter(texte, fait, date){
    const chose = new Todo(this.NextId(),texte, fait, date);
    this.choses.push( chose );
  }

  Retirer(id){
    this.choses = this.choses.filter(function(chose) {
      return chose.id != id;
    });
  }

  Fait(id){
    var choseId = this.choses.findIndex(function(chose) {
      return chose.id == id;
    });

    if(choseId != -1){
      this.choses[choseId].fait = !this.choses[choseId].fait;
    }
  }

  NextId(){
    this.currentId++;
    return this.currentId;
  }
}

module.exports = TodoList;
