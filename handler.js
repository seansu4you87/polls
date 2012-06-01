var util  = require('util')
	, fs = require('fs');

index = function(response) {
  writeFileToResponse("index.html", response);
};

var yes = 0;
var no = 0;

/*plusYes = function(response) {
  yes++;
  poll(response);
};

plusNo = function(response) {
  no++;
  poll(response);
};

poll = function(response) {
  var body = new Buffer(JSON.stringify({yes: yes, no: no}));
  response.writeHead(200, { "Content-Type": "text/json"
                      , "Content-Length": body.length
                      });
  response.end(body)
}*/

writeFileToResponse = function(filename, response) {
  var body, headers;
  var content_type;
  
	fs.readFile(filename, function(error, data){
	  if (error){
	    util.puts('Error loading ' + filename);
	  } else {
	    util.puts('Loading ' + filename);
	    body = data;
	    headers = { 'Content-Type'    : content_type
	              , 'Content-Length'  : body.length   };
	  }
	  response.writeHead(200, headers);
	  response.write(body);
	  response.end();
	});
};

exports.index = index;
//exports.plusYes = plusYes;
//exports.plusNo = plusNo;
//exports.poll = poll;
exports.writeFileToResponse = writeFileToResponse;