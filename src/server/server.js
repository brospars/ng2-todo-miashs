var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var TodoList = require('./TodoList.js');
var Todo = require('./Todo.js');

var todoList = new TodoList();

app.get('/', function(req, res){
  res.send('<pre>This is the socket.io server, this doesn\'t serve anything but the socket js : </pre><a href="/socket.io/socket.io.js">http://localhost:3000/socket.io/socket.io.js</a>');
});

io.on('connection', function(socket){
  console.log('a user connected');

  io.emit('init',todoList.choses);

  socket.on('add', function(data){
    todoList.Ajouter(data.texte,data.fait,data.date);
    io.emit('update',todoList.choses);
  });

  socket.on('dispose', function(id){
    todoList.Retirer(id);
    io.emit('update',todoList.choses);
  });

  socket.on('fait', function(id){
    todoList.Fait(id);
    io.emit('update',todoList.choses);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


