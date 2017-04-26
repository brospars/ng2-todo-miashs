
'use strict';

class Todo{

  constructor(id,texte, fait, date) {
    this.id = id;
    this.texte = texte;
    this.date = date || new Date(Date.now());
    this.fait = fait || false;
  }
}

module.exports = Todo;
