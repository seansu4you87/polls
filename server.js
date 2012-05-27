HOST = null;
PORT = 5000;

var http  = require('http');
var util  = require('util');
var fs    = require('fs');
var url   = require('url');

var yes = 0;
var no = 0;

var server = http.createServer( function (request, response) {
	
	var path = url.parse(request.url).pathname;
	if (path == '/poll'){
	  
	  writeDataToResponse(response);
    
	} else if (path == '/plusyes') {
	  
	  yes++;
	  writeDataToResponse(response);
	  
	} else if (path == '/plusno') {
	  
	  no++;
	  writeDataToResponse(response);
	  
	} else {
	
    var filename = getFile(request);
    writeFileToResponse(filename, response);
  }
	
} );

writeDataToResponse = function (response) {
  
  var body = new Buffer(JSON.stringify({yes: yes, no: no}));
  response.writeHead(200, { "Content-Type": "text/json"
                      , "Content-Length": body.length
                      });
  response.end(body);
  
};

var get_map = {};
get_map['/'] = 'index.html'

getFile = function (request) {
  
  var path = url.parse(request.url).pathname;
  var filename = get_map[path];
  if (!filename){
    filename = path.substring(1);
  }
  return filename;
}

writeFileToResponse = function (filename, response) {
  
  var body, headers;
  var content_type;
  
	fs.readFile(filename, function (error, data){
	  
	  if (error){
	    util.puts('Error loading ' + filename);
	  } else {
	    util.puts('Loading ' + filename);
	    body = data;
	    headers = { 'Content-Type'    : content_type
	              , 'Content-Length'  : body.length   };
	  }
	  
	  response.writeHead(200, headers);
	  response.end(body);
	  
	});
  
};

server.listen(PORT);
util.puts( 'Server at http://' + (HOST || '127.0.0.1') + ':' + PORT.toString() + '/' );

