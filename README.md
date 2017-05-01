# Projet TODOMVC

Implémentation responsive, multiroom et temps réel de [TodoMVC](http://todomvc.com/) utilisant [Angular](https://angular.io/), [Socket.io](https://socket.io/) par Benoit Rospars et Nicolas Picavet.

Pour lancer l'application il vous suffit de suivre le guide ci-dessous.

![gif demonstration](/img/demo.gif)

### Fonctionalités :
- Responsive
- Gestion de plusieurs listes avec titre dynamique
- Mise à jour en temps réel sur tous les clients via Socket.io

### Requis :
- [Node Lastest](https://nodejs.org/en/)
- [Angular Cli](https://cli.angular.io/) `npm install -g @angular/cli`


### Pour démarrer : 
``` 
git clone https://github.com/brospars/ng2-todo-miashs.git
cd ng2-todo-miashs
git checkout -b feat/your-feature
npm install
node src/server/server.js
ng serve
```


