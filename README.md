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
```sh 
git clone https://github.com/brospars/ng2-todo-miashs.git
cd ng2-todo-miashs
npm install -g @angular/cli #si pas déjà installé
npm install
node src/server/server.js
# Dans une autre console
ng serve
```

L'application est accessible sur : http://localhost:4200/


