var util  = require('util');
var handler = require("./handler.js");

route = function(handle, pathname, response){
  util.puts('about to route a request for ' + pathname);
  
  if (handle[pathname] === handler.writeFileToResponse) {
    filename = pathname.substring(1);
    handle[pathname](filename, response);
  } else if (typeof(handle[pathname]) === 'function') {
    return handle[pathname](response);
  } else {
    util.puts('no request handler found for ' + pathname)
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found");
    response.end();
  }
};

exports.route = route;