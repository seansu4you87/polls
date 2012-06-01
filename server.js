HOST = null;
PORT = 5000;

var http = require('http');
var util = require('util');
var url = require('url');
var sockets = require('socket.io');

var yes = 0;
var no = 0;

var io;

start = function(route, handle) {
	listener = function(request, response){
		var pathname = url.parse(request.url).pathname;
		util.puts("Request for " + pathname + " received");
		
		route(handle, pathname, response);
	}
	
	var app = http.createServer(listener).listen(PORT);
  util.puts( 'Server started at http://' + (HOST || '127.0.0.1') + ':' +  PORT.toString() + '/' );

	io = sockets.listen(app);
	io.sockets.on('connection', function(socket){
		socket.emit('update', { yes: yes, no: no});
		socket.on('plusyes', function(data){
			yes++;
			io.sockets.emit('update', { yes: yes, no: no});
		});
		socket.on('plusno', function(data){
			no++;
			io.sockets.emit('update', { yes: yes, no: no});
		});
	})
};

exports.start = start;


