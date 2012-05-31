HOST = null;
PORT = 5000;

var http = require('http');
var util = require('util');
var url = require('url');

var yes = 0;
var no = 0;

start = function(route, handle) {
	listener = function(request, response){
		var pathname = url.parse(request.url).pathname;
		util.puts("Request for " + pathname + " received");
		
		route(handle, pathname, response);
	}
	
	http.createServer(listener).listen(PORT);
  util.puts( 'Server started at http://' + (HOST || '127.0.0.1') + ':' +  PORT.toString() + '/' );
};

exports.start = start;


