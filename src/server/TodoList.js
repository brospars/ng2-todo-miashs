
'use strict';

var Todo = require('./Todo.js');

class TodoList {
  constructor() {
    this.choses = [];
    this.currentId = 0;
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

  Fait(id, toggleAll){
    var choseId = this.choses.findIndex(function(chose) {
      return chose.id == id;
    });

    if(choseId != -1){
      if(toggleAll !== undefined){
        this.choses[choseId].fait = toggleAll;
      }else{
        this.choses[choseId].fait = !this.choses[choseId].fait;
      }
    }
  }

  Edit(id,texte){
    var choseId = this.choses.findIndex(function(chose) {
      return chose.id == id;
    });

    if(choseId != -1){
      this.choses[choseId].texte = texte;
    }
  }

  NextId(){
    this.currentId++;
    return this.currentId;
  }
}

module.exports = TodoList;
