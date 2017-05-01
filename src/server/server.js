var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var TodoList = require('./TodoList.js');
var Todo = require('./Todo.js');

var rooms = {};

app.get('/', function(req, res){
  res.send('<pre>This is the socket.io server, this doesn\'t serve anything but the socket js : </pre><a href="/socket.io/socket.io.js">http://localhost:3000/socket.io/socket.io.js</a>');
});

app.get('/getrooms', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(rooms));
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('init', function(data){
    socket.join(data.room);
    socket.room = findOrAddRoom(data.room);
    io.to(socket.room.name).emit('update',socket.room.todoList.choses);
  });

  socket.on('add', function(data){
    socket.room.todoList.Ajouter(data.texte,data.fait,data.date);
    io.to(socket.room.name).emit('update',socket.room.todoList.choses);
  });

  socket.on('dispose', function(id){
    socket.room.todoList.Retirer(id);
    io.to(socket.room.name).emit('update',socket.room.todoList.choses);
  });

  socket.on('fait', function(data){
    socket.room.todoList.Fait(data.id, data.toggleAll);
    io.to(socket.room.name).emit('update',socket.room.todoList.choses);
  });

  socket.on('change', function(data){
    socket.room.todoList.Edit(data.id, data.texte);
    io.to(socket.room.name).emit('update',socket.room.todoList.choses);
  });

  socket.on('getRooms', function(data){
    io.emit('rooms',getRoomList());
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  if (text.trim() === 'log') {
    console.log(rooms);
  }
  if (text.trim() === 'quit') {
    done();
  }
});

function done() {
  console.log('Stopping the server...');
  process.exit();
}

function findOrAddRoom(roomName){
  console.log('user join : ' + roomName);

  if(roomName in rooms){
    return rooms[roomName];
  }else{
    rooms[roomName] = {
      name: roomName,
      todoList: new TodoList()
    };

    io.emit('rooms',getRoomList());

    return rooms[roomName];
  }
}

function getRoomList(){
  var roomList = [];
  for(var i in rooms){
    roomList.push(rooms[i].name);
  }
  return roomList;
}


